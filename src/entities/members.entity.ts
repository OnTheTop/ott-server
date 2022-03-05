import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  Entity,
  Long,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Family } from './family.entity';

@Entity({ name: 'member' })
export class Member {
  @PrimaryGeneratedColumn()
  id: Long;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'member-nickname' })
  memberNickname: string;

  @Column({ name: 'leader', default: false })
  isLeader: boolean;

  @ManyToOne(() => Family)
  family: Family;
}
