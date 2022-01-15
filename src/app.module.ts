import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilModule } from './util/util.module';
import { AuthModule } from './auth/auth.module';
import * as config from 'config';

const dbConfig = config.get('db');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbConfig.type,
      host: process.env.RDS_HOST || dbConfig.host,
      port: process.env.RDS_PORT || dbConfig.port,
      username: process.env.RDS_USERNAME || dbConfig.username,
      password: process.env.RDS_PASSWORD || dbConfig.password,
      database: process.env.RDS_DATABASE || dbConfig.database,
      entities: dbConfig.entities,
      synchronize: dbConfig.synchronize,
    }),
    UtilModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
