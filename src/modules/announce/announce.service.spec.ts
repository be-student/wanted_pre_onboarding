import { Test, TestingModule } from '@nestjs/testing';
import { AnnounceService } from './announce.service';

describe('AnnounceService', () => {
  let service: AnnounceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnnounceService],
    }).compile();

    service = module.get<AnnounceService>(AnnounceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
