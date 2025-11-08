import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from './members.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

const prismaMock = {
  memberApplication: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    findUnique: jest.fn(),
  },
  member: {
    create: jest.fn(),
  },
};

describe('MembersService', () => {
  let service: MembersService;
  let prisma: typeof prismaMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<MembersService>(MembersService);
    prisma = module.get(PrismaService);

    // Reset mocks before each test
    jest.clearAllMocks();
  });

  describe('applyIntent', () => {
    it('should create a new application', async () => {
      prisma.memberApplication.create.mockResolvedValue({ id: '1', name: 'John' });
      const result = await service.applyIntent({ name: 'John', email: 'john@example.com' });
      expect(result).toEqual({ id: '1', name: 'John' });
      expect(prisma.memberApplication.create).toHaveBeenCalledWith({
        data: { name: 'John', email: 'john@example.com' },
      });
    });

    it('should throw BadRequestException on duplicate email', async () => {
      prisma.memberApplication.create.mockRejectedValue({ code: 'P2002' });
      await expect(
        service.applyIntent({ name: 'John', email: 'john@example.com' }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('listApplications', () => {
    it('should return all applications', async () => {
      prisma.memberApplication.findMany.mockResolvedValue([{ id: '1' }, { id: '2' }]);
      const result = await service.listApplications();
      expect(result).toEqual([{ id: '1' }, { id: '2' }]);
      expect(prisma.memberApplication.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('updateStatus', () => {
    it('should update status and generate token if approved', async () => {
      prisma.memberApplication.update.mockImplementation(({ data }) =>
        Promise.resolve({ id: '1', ...data }),
      );

      const result = await service.updateStatus('1', 'APPROVED');
      expect(result.status).toBe('APPROVED');
      expect(result.token).toHaveLength(16 * 2); // 16 bytes in hex
    });

    it('should throw NotFoundException if update fails', async () => {
      prisma.memberApplication.update.mockRejectedValue({ code: 'P2025' });
      await expect(service.updateStatus('999', 'REJECTED')).rejects.toThrow(NotFoundException);
    });
  });

  describe('completeRegistration', () => {
    it('should complete registration', async () => {
      const app = { id: '1', token: 'abc' };
      prisma.memberApplication.findUnique.mockResolvedValue(app);
      prisma.member.create.mockResolvedValue({ id: '2', name: 'John' });
      prisma.memberApplication.update.mockResolvedValue({ id: '1', token: null });

      const result = await service.completeRegistration('abc', { name: 'John', email: 'john@example.com' });
      expect(result).toEqual({ id: '2', name: 'John' });
      expect(prisma.memberApplication.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { token: null },
      });
    });

    it('should throw NotFoundException if token invalid', async () => {
      prisma.memberApplication.findUnique.mockResolvedValue(null);
      await expect(
        service.completeRegistration('invalid', { name: 'John', email: 'john@example.com' }),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
