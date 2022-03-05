import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  Long,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Familiy } from './familiy.entity';

@Entity({ name: 'member' })
export class Member {
  @PrimaryGeneratedColumn()
  id: Long;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'nick-name' })
  nickName: string;

  @IsNumber()
  @Column({ name: 'gauge' })
  gauge: number;

  @IsString()
  @Column({ name: 'familiy-code', unique: true })
  familiyCode: number;

  @IsNumber()
  @Column({ name: 'member-cnt' })
  memberCount: number;

  @ManyToOne(() => Familiy)
  familiy: Familiy;
}
