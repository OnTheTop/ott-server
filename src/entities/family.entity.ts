import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, Long, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'family' })
export class Family {
  @PrimaryGeneratedColumn()
  id: Long;

  @Column({ name: 'family-nickname' })
  familyNickname: string;

  @IsNumber()
  @Column({ name: 'gauge', default: 0 })
  gauge: number;

  @IsString()
  @Column({ name: 'family-code', unique: true })
  familyCode: string;

  @IsNumber()
  @Column({ name: 'member-cnt', default: 0 })
  memberCount: number;
}
