import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CarryOutQuestionMissionDto } from './dto/carry-out-question-mission.dto';
import { MissionsService } from './missions.service';

@Controller('missions')
export class MissionsController {
  constructor(private readonly missionService: MissionsService) {}

  @Get('/:missionId/family/:familyId')
  async getMission(
    @Param('missionId') missionId: number,
    @Param('familyId') familyId: number,
  ) {
    return await this.missionService.getMission(missionId, familyId);
  }

  @Get('/family/:familyId')
  async getMissionsOfFamily(@Param('familyId') familyId: number) {
    return await this.missionService.getMissionsOfFamily(familyId);
  }

  @Get('/question/:missionId/family/:familyId')
  async getQuestionMissionOfFamily(
    @Param('missionId') missionId: number,
    @Param('familyId') familyId: number,
  ) {
    return await this.missionService.getQuestionMissionOfFamily(
      missionId,
      familyId,
    );
  }

  @Get('/picture/:missionId/family/:familyId')
  async getPictureMissionOfFamily(
    @Param('missionId') missionId: number,
    @Param('familyId') familyId: number,
  ) {
    return await this.missionService.getPictureMissionOfFamily(
      missionId,
      familyId,
    );
  }

  @Post('/question/:missionId/family/:familyId')
  async carryOutQuestionMission(
    @Param('missionId') missionId: number,
    @Param('familyId') familyId: number,
    @Body() carryOutQuestionMissionDto: CarryOutQuestionMissionDto,
  ) {
    return await this.missionService.carryOutQuestionMission(
      missionId,
      familyId,
      carryOutQuestionMissionDto,
    );
  }
}
