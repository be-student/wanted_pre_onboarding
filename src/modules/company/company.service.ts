import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '@typeormEntity/Company.entity';
import { CompanyAdditional } from '@typeormEntity/CompanyAdditional.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(CompanyAdditional)
    private readonly companyAdditionalRepository: Repository<CompanyAdditional>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const existed: Company = await this.getCompany(createCompanyDto.name);
    if (existed) {
      throw new ConflictException('already exist company');
    }

    let company = this.generateCompany(createCompanyDto);

    const additionals: Array<CompanyAdditional> = this.parseAdditional(
      createCompanyDto.additional,
    );
    company.additionals = additionals;

    company = await this.companyRepository.save(company);

    Promise.all(
      additionals.map(async (additional) => {
        additional.company = company;
        console.log(additional);
        await this.companyAdditionalRepository.save(additional);
      }),
    );
  }

  findAll() {
    return `This action returns all company`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
  generateCompany(createCompanyDto: CreateCompanyDto): Company {
    const company = new Company();
    company.name = createCompanyDto.name;
    return company;
  }

  async getCompany(name: string) {
    return await this.companyRepository.findOne({
      where: { name: name },
      relations: ['additionals'],
    });
  }
  parseAdditional(additionals: CreateCompanyDto['additional']) {
    const companyAdditionals: Array<CompanyAdditional> = [];
    additionals?.map((addition) => {
      const key = Object.keys(addition)[0];
      const value = addition[key];
      const additional = new CompanyAdditional();
      additional.key = key;
      additional.content = value;
      companyAdditionals.push(additional);
    });
    return companyAdditionals;
  }
}
