import { Test, TestingModule } from '@nestjs/testing';
import { FamilyService } from './family.service';

describe('FamiliyService', () => {
  let service: FamilyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilyService],
    }).compile();

    service = module.get<FamilyService>(FamilyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
