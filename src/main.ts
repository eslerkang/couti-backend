import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const serverConfig = config.get('server');
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format:
            process.env.NODE_ENV === 'production'
              ? winston.format.simple()
              : winston.format.combine(
                  winston.format.timestamp(),
                  utilities.format.nestLike('Couti', { prettyPrint: true }),
                ),
        }),
      ],
    }),
  });
  await app.listen(serverConfig.port);
  logger.log(`App Listening at localhost:${serverConfig.port}`);
}
bootstrap();
