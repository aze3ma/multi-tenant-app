import { Injectable } from '@nestjs/common';
import { Organization, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async create(name: string): Promise<Organization> {
    return await this.prisma.organization.create({
      data: { name },
    });
  }

  async findById(id: string): Promise<
    | (Organization & {
        users: Pick<User, 'id' | 'email' | 'role' | 'createdAt'>[];
      })
    | null
  > {
    return await this.prisma.organization.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async findByUserId(userId: string): Promise<
    | (Organization & {
        users: Pick<User, 'id' | 'email' | 'role' | 'createdAt'>[];
      })
    | null
    | undefined
  > {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        organization: {
          include: {
            users: {
              select: {
                id: true,
                email: true,
                role: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });
    return user?.organization;
  }
}
