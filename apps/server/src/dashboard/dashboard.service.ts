import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const totalMembers = await this.prisma.member.count({
      where: { active: true },
    });
    const totalReferrals = await this.prisma.referral.count({
      where: { createdAt: { gte: startOfMonth } },
    });
    const totalThanks = await this.prisma.thanksRecord.count({
      where: { createdAt: { gte: startOfMonth } },
    });

    return { totalMembers, totalReferrals, totalThanks };
  }
}
