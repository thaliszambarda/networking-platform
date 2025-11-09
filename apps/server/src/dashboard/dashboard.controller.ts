import { Controller, Get, Headers, BadRequestException } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ConfigService } from '@nestjs/config';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private service: DashboardService,
    private config: ConfigService
  ) {}

  @Get()
  async getStats(@Headers('x-admin-secret') secret: string) {
    if (!secret || secret !== this.config.get('ADMIN_SECRET')) {
      throw new BadRequestException('Unauthorized');
    }
    return this.service.getStats();
  }
}
