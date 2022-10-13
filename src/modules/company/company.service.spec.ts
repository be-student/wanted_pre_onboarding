import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Company } from '@typeormEntity/Company.entity';
import { CompanyAdditional } from '@typeormEntity/CompanyAdditional.entity';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';

const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
});
describe('CompanyService', () => {
  let service: CompanyService;
  const companyAdditionals: CreateCompanyDto['additional'] = [
    { employeeCount: '20' },
    { location: 'seoul' },
  ];
  const additional1 = new CompanyAdditional();
  additional1.key = 'employeeCount';
  additional1.content = '20';

  const additional2 = new CompanyAdditional();
  additional2.key = 'location';
  additional2.content = 'seoul';
  const resultAdditionals = [additional1, additional2];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        { provide: getRepositoryToken(Company), useValue: mockRepository() },
        {
          provide: getRepositoryToken(CompanyAdditional),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('parse company additionals', () => {
    expect(service.parseAdditional(companyAdditionals)).toStrictEqual(
      resultAdditionals,
    );
  });
});
