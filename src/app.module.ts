import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './modules/members/members.module';
import * as ormconfig from '../ormconfig';
import { FamiliyModule } from './modules/family/family.module';
import { FamilyController } from './modules/family/family.controller';
import { FamilyService } from './modules/family/family.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormconfig),
    MembersModule,
    FamiliyModule,
  ],
  controllers: [AppController, FamilyController],
  providers: [AppService, FamilyService],
})
export class AppModule {}
