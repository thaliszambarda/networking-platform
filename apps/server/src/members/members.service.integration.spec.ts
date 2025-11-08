import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from './members.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('MembersService Integration', () => {
  let service: MembersService;
  let prisma: PrismaService;



  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
      ],
      providers: [MembersService, PrismaService],
    }).compile();

    service = module.get<MembersService>(MembersService);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.memberApplication.deleteMany();
    await prisma.member.deleteMany();
  });

  afterEach(async () => {
    await prisma.memberApplication.deleteMany();
    await prisma.member.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new application', async () => {
    const result = await service.applyIntent({
      name: 'Alice',
      email: 'alice@example.com',
      company: 'TestCorp',
      reason: 'Testing',
    });

    expect(result).toHaveProperty('id');
    expect(result.name).toBe('Alice');
    expect(result.email).toBe('alice@example.com');
  });

  it('should throw BadRequestException if email already exists', async () => {
    await service.applyIntent({ name: 'Bob', email: 'bob@example.com' });
    await expect(
      service.applyIntent({ name: 'Bob2', email: 'bob@example.com' }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should update status and generate token', async () => {
    const app = await service.applyIntent({ name: 'Charlie', email: 'charlie@example.com' });

    const updated = await service.updateStatus(app.id, 'APPROVED');
    expect(updated.status).toBe('APPROVED');
    expect(updated.token).toHaveLength(32); // 16 bytes -> 32 chars hex
  });

  it('should complete registration', async () => {
    const app = await service.applyIntent({ name: 'Dave', email: 'dave@example.com' });
    const updated = await service.updateStatus(app.id, 'APPROVED');

    const member = await service.completeRegistration(updated.token!, {
      name: 'Dave',
      email: 'dave@example.com',
      company: 'TestInc',
    });

    expect(member).toHaveProperty('id');
    expect(member.name).toBe('Dave');
  });
});
