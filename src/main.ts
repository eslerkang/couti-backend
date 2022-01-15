import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const serverConfig = config.get('server');
  const app = await NestFactory.create(AppModule);
  await app.listen(serverConfig.port);
  logger.log(`Server Listening at ${serverConfig.port}`);
}
bootstrap();
