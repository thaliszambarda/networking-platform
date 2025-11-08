import { Controller, Post, Body, Get, Patch, Param, Headers, BadRequestException } from '@nestjs/common';
import { MembersService } from './members.service';
import { ConfigService } from '@nestjs/config';
import { ApplyMemberDto } from './dto/apply-member.dto';
import { CompleteRegistrationDto } from './dto/complete-registration.dto';
import { ApplicationStatus } from './dto/update-status.dto';

@Controller('members')
export class MembersController {
  constructor(private service: MembersService, private config: ConfigService) {}

  @Post('apply')
  async apply(@Body() body: ApplyMemberDto) {
    return this.service.applyIntent(body);
  }

  @Get('admin/applications')
  async list(@Headers('x-admin-secret') secret: string) {
    this.checkAdmin(secret);
    return this.service.listApplications();
  }

  @Patch('admin/applications/:id/:status')
  async updateStatus(
    @Param('id') id: string,
    @Param('status') status: ApplicationStatus,
    @Headers('x-admin-secret') secret: string
  ) {
    this.checkAdmin(secret);

    if (!Object.values(ApplicationStatus).includes(status)) {
      throw new BadRequestException(`status must be one of: ${Object.values(ApplicationStatus).join(', ')}`);
    }

    const app = await this.service.updateStatus(id, status);

    if (status === ApplicationStatus.APPROVED && app.token) {
      console.log(
        'Invite link (simulate email):',
        `${this.config.get('APP_URL') || 'http://localhost:3000'}/register/${app.token}`
      );
    }

    return app;
  }

  @Post('register/:token')
  async complete(@Param('token') token: string, @Body() body: CompleteRegistrationDto) {
    return this.service.completeRegistration(token, body);
  }

  private checkAdmin(secret: string) {
    if (!secret || secret !== this.config.get('ADMIN_SECRET')) {
      throw new BadRequestException('Unauthorized');
    }
  }
}
