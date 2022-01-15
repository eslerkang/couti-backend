import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserKakaoDto } from './dto/user.kakao.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async kakaoLogin(
    userKakaoDto: UserKakaoDto,
  ): Promise<{ accessToken: string }> {
    const { kakaoId, name, email } = userKakaoDto;
    let user = await this.userRepository.findOne({ kakaoId });
    if (!user) {
      user = this.userRepository.create({
        kakaoId,
        name,
        email,
      });

      try {
        await this.userRepository.save(user);
      } catch (e) {
        if (e.code === '23505') {
          throw new ConflictException('Existing User');
        } else {
          throw new InternalServerErrorException();
        }
      }
    }
    const payload = { id: user.id, accessToken: userKakaoDto.accessToken };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
