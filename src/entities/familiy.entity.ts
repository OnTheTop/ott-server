import { Column, Entity, Long, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'familiy' })
export class Familiy {
  @PrimaryGeneratedColumn()
  id: Long;

  @Column({ name: 'nickname' })
  nickName: string;

  @Column({ name: 'leader' })
  isLeader: boolean;
}
