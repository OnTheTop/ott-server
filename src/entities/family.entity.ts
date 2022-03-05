import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, Long, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'family' })
export class Family {
  @PrimaryGeneratedColumn()
  id: Long;

  @Column({ name: 'family-nickname' })
  familyNickname: string;

  @IsNumber()
  @Column({ name: 'gauge' })
  gauge: number;

  @IsString()
  @Column({ name: 'family-code', unique: true })
  familyCode: number;

  @IsNumber()
  @Column({ name: 'member-cnt' })
  memberCount: number;
}
