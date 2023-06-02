import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

const configService = new ConfigService();

export default new DataSource({
    type: 'mysql',
    url: configService.get('MYSQLDB_URI'),
    entities: ['./src/entities/*.ts'],
    migrations: ['./src/database/migrations/*.ts'],
});