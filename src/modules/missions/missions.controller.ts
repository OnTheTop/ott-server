import { Controller, Get, Param } from '@nestjs/common';
import { MissionsService } from './missions.service';

@Controller('missions')
export class MissionsController {
  constructor(private readonly missionService: MissionsService) {}

  @Get('/:id')
  async getMission(@Param('id') missionId: number) {
    return await this.missionService.getMission(missionId);
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
}
