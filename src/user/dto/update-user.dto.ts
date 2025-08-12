import { IsBoolean, IsEmail, IsEnum, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  address?: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  password?: string;
  
  @IsOptional()
  @IsBoolean()
  state?: Boolean

  @IsString()
  uuid: string;  
}
