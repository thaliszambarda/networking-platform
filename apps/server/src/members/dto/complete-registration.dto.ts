import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CompleteRegistrationDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  company?: string;
}