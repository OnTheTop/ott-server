import { IsString, IsNotEmpty } from 'class-validator';

export class JoinFamilyDto {
  @IsString()
  @IsNotEmpty()
  memberNickname: string;
}
