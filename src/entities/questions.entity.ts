import { IsNumber, IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  Long,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Family } from './family.entity';
import { Member } from './members.entity';
import { Mission } from './missions.entity';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn()
  id: Long;

  @IsNumber()
  @IsOptional()
  @Column({ default: null })
  answer: string;

  @ManyToOne(() => Family)
  family: Family;

  @ManyToOne(() => Member)
  member: Member;

  @ManyToOne(() => Mission)
  mission: Mission;
}
