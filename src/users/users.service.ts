import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(
    id: string,
  ): Promise<Pick<
    User,
    'id' | 'email' | 'role' | 'orgId' | 'createdAt' | 'updatedAt'
  > | null> {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        orgId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
