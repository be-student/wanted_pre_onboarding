import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Announce } from '@typeormEntity/Announce.entity';
import { AnnounceAdditional } from '@typeormEntity/AnnounceAdditional.entity';
import { Repository } from 'typeorm';
import { CreateAnnounce } from './dto/createAnnounce';

@Injectable()
export class AnnounceService {
  constructor(
    @InjectRepository(Announce)
    private readonly announceRepository: Repository<Announce>,
    @InjectRepository(AnnounceAdditional)
    private readonly announceAdditionalRepository: Repository<AnnounceAdditional>,
  ) {}

  async create(createAnnounce: CreateAnnounce) {
    let newAnnounce = new Announce();
    newAnnounce.content = createAnnounce.getContent();
    newAnnounce.position = createAnnounce.getPosition();
    newAnnounce = await this.announceRepository.save(newAnnounce);
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
    return newAnnounce.id;
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
