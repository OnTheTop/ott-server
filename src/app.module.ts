import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './modules/members/members.module';
import * as ormconfig from '../ormconfig';
import { FamiliyModule } from './modules/family/family.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormconfig),
    MembersModule,
    FamiliyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
