import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: {
    email: string;
    password: string;
    organizationName: string;
  }) {
    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        role: 'ADMIN',
        organization: {
          create: { name: dto.organizationName },
        },
      },
      include: { organization: true },
    });

    const token = this.jwt.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    });

    return { user: { id: user.id, email: user.email }, accessToken: token };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    const matchedUser = await bcrypt.compare(password, user.password);

    if (!matchedUser) return null;

    return user;
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.validateUser(dto.email, dto.password);

    if (!user) throw new UnauthorizedException('Invalid Credentials');

    const token = this.jwt.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    });

    return { accessToken: token };
  }
}
