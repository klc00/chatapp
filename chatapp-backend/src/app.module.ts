import { Module } from '@nestjs/common';
import { MysqlDBModule } from './database/modules/mysqldb.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PlaygroundModule } from './modules/playground/playground.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),

    MysqlDBModule,

    AuthModule,
    UserModule,
    PlaygroundModule,
  ],
})
export class AppModule { }
