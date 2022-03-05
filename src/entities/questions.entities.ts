import { IsNumber, IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  Long,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Familiy } from './familiy.entity';
import { Member } from './members.entity';
import { Mission } from './missions.entities';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn()
  id: Long;

  @IsNumber()
  @IsOptional()
  @Column()
  answer: string;

  @ManyToOne(() => Familiy)
  family: Familiy;

  @ManyToOne(() => Member)
  member: Member;

  @ManyToOne(() => Mission)
  mission: Mission;
}
