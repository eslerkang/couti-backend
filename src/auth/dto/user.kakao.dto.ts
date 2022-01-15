import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserKakaoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string | null;

  @IsString()
  @IsNotEmpty()
  kakaoId: string;

  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
