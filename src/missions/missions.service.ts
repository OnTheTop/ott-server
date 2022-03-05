import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mission } from 'src/entities/missions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MissionsService {
  constructor(
    @InjectRepository(Mission)
    private readonly missionRepository: Repository<Mission>,
  ) {}

  async getMission(missionId: number): Promise<Mission> {
    return await this.missionRepository.findOne({ where: { id: missionId } });
  }
}
