import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as config from 'config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UnauthorizedException } from '@nestjs/common';
import { UserWithAccessTokenDto } from './dto/user.with.accessToken.dto';
import { User } from './user.entity';

const jwtConfig = config.get('jwt');

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
    });
  }

  async validate(payload) {
    const { id, accessToken } = payload;
    const user: User = await this.userRepository.findOne(id);
    if (!user) {
      throw new UnauthorizedException('InvalidToken');
    }
    const userWithAccessToken: UserWithAccessTokenDto = {
      ...user,
      accessToken,
    };
    return userWithAccessToken;
  }
}
