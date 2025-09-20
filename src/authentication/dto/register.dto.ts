import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDTO {
  @IsEmail() email: string;
  @IsNotEmpty() organizationName: string;
  @MinLength(6) password: string;
}
