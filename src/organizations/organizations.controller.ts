import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrganizationsService } from './organizations.service';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import type { RequestWithUser } from '../common/interfaces/user.interface';

@Controller('organizations')
@UseGuards(AuthGuard('jwt'))
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @Get('me')
  getMyOrganization(@Request() req: RequestWithUser) {
    return this.organizationsService.findByUserId(req.user.id);
  }

  @Get('users')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  getOrganizationUsers(@Request() req: RequestWithUser) {
    return this.organizationsService.findById(req.user.organizationId);
  }
}
