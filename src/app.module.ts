import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as ormconfig from '../ormconfig';
import { MissionsModule } from './missions/missions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormconfig),
    MissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
