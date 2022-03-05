import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from 'src/entities/family.entity';
import { Member } from 'src/entities/members.entity';
import { Mission } from 'src/entities/missions.entity';
import { Picture } from 'src/entities/pictures.entity';
import { Question } from 'src/entities/questions.entity';
import { MissionsController } from './missions.controller';
import { MissionsService } from './missions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mission, Family, Member, Question, Picture]),
  ],
  controllers: [MissionsController],
  providers: [MissionsService],
})
export class MissionsModule {}
