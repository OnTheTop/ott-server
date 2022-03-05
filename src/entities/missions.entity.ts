import { IsDate, IsNotEmpty, IsString } from 'class-validator';
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
  @IsNotEmpty()
  @Column()
  date: Date;
}
