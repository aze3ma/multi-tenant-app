import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authentication: AuthenticationService) {}

  @Post('register')
  register(@Body() dto: RegisterDTO) {
    return this.authentication.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDTO) {
    return this.authentication.login(dto);
  }
}
