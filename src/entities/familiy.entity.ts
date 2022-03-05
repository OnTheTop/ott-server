import {
  Column,
  Entity,
  Long,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './members.entity';

@Entity({ name: 'familiy' })
export class Familiy {
  @PrimaryGeneratedColumn()
  id: Long;

  @Column({ name: 'nickname' })
  nickName: string;

  @Column({ name: 'leader' })
  isLeader: boolean;

  @OneToMany(() => Member, (member) => member.familiy)
  members: Member[];
}
