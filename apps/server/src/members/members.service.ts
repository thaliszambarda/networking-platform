import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async applyIntent(data: { name: string; email: string; company?: string; reason?: string }) {
    try {
      return await this.prisma.memberApplication.create({ data });
    } catch (err) {
      if (err.code === 'P2002') {
        throw new BadRequestException('Email already registered');
      }
      throw err;
    }
  }

  async listApplications() {
    return this.prisma.memberApplication.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async updateStatus(id: string, status: 'APPROVED' | 'REJECTED' | 'PENDING') {
    const token = status === 'APPROVED' ? randomBytes(16).toString('hex') : null;

    try {
      const app = await this.prisma.memberApplication.update({
        where: { id },
        data: { status, token },
      });
      return app;
    } catch (err) {
      if (err.code === 'P2025') {
        throw new NotFoundException(`Application with id ${id} not found`);
      }
      throw err;
    }
  }

  async completeRegistration(token: string, data: { name: string; email: string; company?: string }) {
    const app = await this.prisma.memberApplication.findUnique({ where: { token } });
    if (!app) throw new NotFoundException('Invalid or expired token');

    const member = await this.prisma.member.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company,
      },
    });

    await this.prisma.memberApplication.update({
      where: { id: app.id },
      data: { token: null },
    });

    return member;
  }
}
