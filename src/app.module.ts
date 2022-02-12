import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { utilities, WinstonModule } from 'nest-winston';
import { AuthModule } from './auth/auth.module';
import typeORMConfig from './config/typeorm.config';
import * as winston from 'winston';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
