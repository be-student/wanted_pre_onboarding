import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Announce } from '@typeormEntity/Announce.entity';
import { AnnounceAdditional } from '@typeormEntity/AnnounceAdditional.entity';
import { getConnection, Repository } from 'typeorm';
import { CreateAnnounce } from './dto/createAnnounce';

@Injectable()
export class AnnounceService {
  constructor(
    @InjectRepository(Announce)
    private readonly announceRepository: Repository<Announce>,
    @InjectRepository(AnnounceAdditional)
    private readonly announceAdditionalRepository: Repository<AnnounceAdditional>,
  ) {}

  private async saveAnnounce(createAnnounce: CreateAnnounce, id?: number) {
    const newAnnounce = new Announce();
    newAnnounce.content = createAnnounce.getContent();
    newAnnounce.position = createAnnounce.getPosition();
    if (id) {
      newAnnounce.id = id;
    }
    return await this.announceRepository.save(newAnnounce);
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
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    let id: number;
    try {
      const newAnnounce = await this.saveAnnounce(createAnnounce);
      await this.saveAdditional(createAnnounce, newAnnounce);
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
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();

    try {
      await this.announceRepository.delete(id);
      const newAnnounce = await this.saveAnnounce(updateAnnounce, +id);
      await this.saveAdditional(updateAnnounce, newAnnounce);
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
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
