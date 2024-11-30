// create-candidate.dto.ts
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsArray, IsNumber } from 'class-validator';

export class CreateCandidateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsBoolean()
  recruited: boolean;

  @IsOptional()
  @IsNumber()
  recruitmentYear?: number;
}
