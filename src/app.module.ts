import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';

@Module({
  imports: [AuthenticationModule, UsersModule, OrganizationsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
