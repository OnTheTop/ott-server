import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from '../../entities/family.entity';
import { Member } from '../../entities/members.entity';
import { FamilyController } from './family.controller';
import { FamilyService } from './family.service';

@Module({
  imports: [TypeOrmModule.forFeature([Family, Member])],
  controllers: [FamilyController],
  providers: [FamilyService],
  exports: [FamilyService],
})
export class FamiliyModule {}
