import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MembersModule } from './members/members.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PrismaService } from './prisma/prisma.service';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MembersModule, DashboardModule],
  providers: [PrismaService],
})
export class AppModule {}
