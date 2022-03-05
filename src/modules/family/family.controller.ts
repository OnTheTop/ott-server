import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { FamilyService } from './family.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { JoinFamilyDto } from './dto/join-family.dto';

@Controller('family')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Post()
  async createFamily(@Body() createFamilyDto: CreateFamilyDto) {
    return await this.familyService.signUp(createFamilyDto);
  }

  @Post('/:familyCode')
  async joinFamily(
    @Param('familyCode') familyCode: string,
    @Body() joinFamilyDto: JoinFamilyDto,
  ) {
    return await this.familyService.addMember(
      joinFamilyDto.memberNickname,
      familyCode,
    );
  }
}
