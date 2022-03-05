import { Column, Entity, Long, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'family' })
export class Family {
  @PrimaryGeneratedColumn()
  id: Long;

  @Column({ name: 'nickname' })
  nickName: string;

  @Column({ name: 'leader' })
  isLeader: boolean;
}
