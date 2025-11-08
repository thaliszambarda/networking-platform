import { IsString, IsEmail, IsOptional } from 'class-validator';

export class ApplyMemberDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  reason?: string;
}


