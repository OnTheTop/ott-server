import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT | 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: {
    migrationsDir: __dirname + '/src/migrations',
  },
  autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: true,
  logging: process.env.NODE_ENV !== 'production',
};

export = config;
