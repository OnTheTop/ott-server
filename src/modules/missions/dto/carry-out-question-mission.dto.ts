import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CarryOutQuestionMissionDto {
  @IsNumber()
  @IsNotEmpty()
  memberId: number;

  @IsString()
  @IsNotEmpty()
  answer: string;
}
