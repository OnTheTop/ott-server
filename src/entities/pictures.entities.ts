import { IsNotEmpty, IsString } from 'class-validator';
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

@Entity({ name: 'pictures' })
export class Picture {
  @PrimaryGeneratedColumn()
  id: Long;

  @IsString()
  @IsNotEmpty()
  @Column()
  old_picture_url: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  current_picture_url: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  comment: string;

  @ManyToOne(() => Familiy)
  family: Familiy;

  @ManyToOne(() => Member)
  member: Member;

  @ManyToOne(() => Mission)
  mission: Mission;
}
