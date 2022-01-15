import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserWithAccessTokenDto } from './dto/user.with.accessToken.dto';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserWithAccessTokenDto => {
    const req = ctx.switchToHttp().getRequest();
    return req.user as UserWithAccessTokenDto;
  },
);
