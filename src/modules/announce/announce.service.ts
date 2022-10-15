import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Announce } from '@typeormEntity/Announce.entity';
import { AnnounceAdditional } from '@typeormEntity/AnnounceAdditional.entity';
import { Company } from '@typeormEntity/Company.entity';
import { DataSource, Not, Repository } from 'typeorm';
import { CreateAnnounce } from './dto/createAnnounceDto';

@Injectable()
export class AnnounceService {
  constructor(
    @InjectRepository(Announce)
    private readonly announceRepository: Repository<Announce>,
    @InjectRepository(AnnounceAdditional)
    private readonly announceAdditionalRepository: Repository<AnnounceAdditional>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly datasource: DataSource,
  ) {}

  private async saveAnnounce(
    createAnnounce: CreateAnnounce,
    company: Company,
    id?: number,
  ) {
    const newAnnounce = new Announce();
    newAnnounce.content = createAnnounce.getContent();
    newAnnounce.position = createAnnounce.getPosition();
    newAnnounce.company = company;
    if (id) {
      newAnnounce.id = id;
    }
    return await this.announceRepository.save(newAnnounce);
  }
  private async findCompany(createAnnounce: CreateAnnounce) {
    const company = await this.companyRepository.findOne({
      where: {
        id: createAnnounce.getCompanyId(),
      },
    });
    if (!company) {
      throw new NotFoundException('company not found');
    }
    return company;
  }
  private async saveAdditional(
    createAnnounce: CreateAnnounce,
    newAnnounce: Announce,
  ) {
    const announceAdditionals: Array<AnnounceAdditional> =
      this.generateAnnounceAdditionals(
        createAnnounce.getAdditional(),
        newAnnounce,
      );
    newAnnounce.additionals = announceAdditionals;
    Promise.all(
      announceAdditionals.map((announceAdditional) => {
        this.announceAdditionalRepository.save(announceAdditional);
      }),
    );
  }
  async create(createAnnounce: CreateAnnounce) {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.startTransaction();
    let id: number;
    try {
      const company = await this.findCompany(createAnnounce);
      const newAnnounce = await this.saveAnnounce(createAnnounce, company);
      await this.saveAdditional(createAnnounce, newAnnounce);
      newAnnounce.company = company;
      id = newAnnounce.id;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return id;
  }
  async delete(id: string) {
    return await this.announceRepository.delete(id);
  }

  async update(updateAnnounce: CreateAnnounce, id: string) {
    const target: Announce = await this.announceRepository.findOne({
      where: { id: +id },
      relations: ['additionals'],
    });
    if (!target) {
      throw new NotFoundException('announce not found error');
    }
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      await this.announceRepository.delete(id);
      const company = await this.findCompany(updateAnnounce);
      const newAnnounce = await this.saveAnnounce(updateAnnounce, company, +id);
      await this.saveAdditional(updateAnnounce, newAnnounce);
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findByPage(page?: number, search?: string) {
    let skip = 0;
    if (page) {
      skip = page * 10 - 10;
    }
    return await this.announceRepository
      .createQueryBuilder('announce')
      .offset(skip)
      .leftJoinAndSelect('announce.additionals', 'additionals')
      .limit(10)
      .getMany();
  }
  async findById(id: number) {
    const thisOne = await this.announceRepository
      .createQueryBuilder('announce')
      .addSelect('announce.content')
      .leftJoinAndSelect('announce.additionals', 'additionals')
      .where('announce.id = :id', { id: id })
      .getOne();
    const others = await this.announceRepository.find({
      where: {
        company: thisOne.company,
        id: Not(thisOne.id),
      },
      select: {
        id: true,
      },
    });
    return { thisOne, others };
  }
  generateAnnounceAdditionals(
    additionals: Array<{ [key: string]: string }>,
    announce: Announce,
  ): Array<AnnounceAdditional> {
    if (!additionals) {
      return [];
    }
    return additionals.map((additional) => {
      const newAdditional = new AnnounceAdditional();
      const key = Object.keys(additional)[0];
      const value = additional[key];
      newAdditional.key = key;
      newAdditional.content = value;
      newAdditional.announce = announce;
      return newAdditional;
    });
  }
}
