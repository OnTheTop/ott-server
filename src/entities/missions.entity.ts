import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column, Entity, Long, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'missions' })
export class Mission {
  @PrimaryGeneratedColumn()
  id: Long;

  @IsString()
  @IsNotEmpty()
  @Column()
  category: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  content: string;

  @IsDate()
  @IsOptional()
  @Column({ default: null })
  date: Date;
}
