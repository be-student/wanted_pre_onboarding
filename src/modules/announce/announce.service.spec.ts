import { CreateCompanyDto } from '@modules/company/dto/create-company.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Announce } from '@typeormEntity/Announce.entity';
import { AnnounceAdditional } from '@typeormEntity/AnnounceAdditional.entity';
import { Company } from '@typeormEntity/Company.entity';
import { AnnounceService } from './announce.service';

const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
});
describe('AnnounceService', () => {
  let service: AnnounceService;

  const announce = new Announce();
  announce.content = 'test Content';
  announce.position = 'existing position';
  const createCompnay: CreateCompanyDto = new CreateCompanyDto();
  createCompnay.name = 'testing';
  const additionals = [{ hello: 'world' }];
  const resultAdditionals = new AnnounceAdditional();
  resultAdditionals.key = 'hello';
  resultAdditionals.content = 'world';
  resultAdditionals.announce = announce;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnnounceService,
        {
          provide: getRepositoryToken(Announce),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(AnnounceAdditional),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<AnnounceService>(AnnounceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate additional', () => {
    expect(
      service.generateAnnounceAdditionals(additionals, announce),
    ).toStrictEqual([resultAdditionals]);
  });
});
