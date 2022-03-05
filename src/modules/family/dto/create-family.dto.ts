import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFamilyDto {
  @IsString()
  @IsNotEmpty()
  familyNickname: string;

  @IsString()
  @IsNotEmpty()
  memberNickname: string;
}
