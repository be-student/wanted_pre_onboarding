import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Announce } from '@typeormEntity/Announce.entity';
import { AnnounceService } from './announce.service';

const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
});
describe('AnnounceService', () => {
  let service: AnnounceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnnounceService,
        {
          provide: getRepositoryToken(Announce),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<AnnounceService>(AnnounceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
