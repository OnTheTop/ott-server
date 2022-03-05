import { Controller, Get, Param } from '@nestjs/common';
import { MissionsService } from './missions.service';

@Controller('missions')
export class MissionsController {
  constructor(private readonly missionService: MissionsService) {}

  @Get('/:id')
  async getMission(@Param('id') missionId: number) {
    return await this.missionService.getMission(missionId);
  }
}
