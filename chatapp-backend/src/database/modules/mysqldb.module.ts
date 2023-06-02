import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        url: configService.get('MYSQLDB_URI'),
        autoLoadEntities: true,
        synchronize: true,
      }),

      inject: [ConfigService],
    }),
  ],
})
export class MysqlDBModule {}
