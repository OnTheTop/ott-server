import { IsOptional, IsString } from 'class-validator';
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

@Entity({ name: 'pictures' })
export class Picture {
  @PrimaryGeneratedColumn()
  id: Long;

  @IsString()
  @IsOptional()
  @Column({ default: null })
  pastPhoto: string;

  @IsString()
  @IsOptional()
  @Column({ default: null })
  recentPhoto: string;

  @IsString()
  @IsOptional()
  @Column({ default: null })
  comment: string;

  @ManyToOne(() => Family)
  family: Family;

  @ManyToOne(() => Member)
  member: Member;

  @ManyToOne(() => Mission)
  mission: Mission;
}
