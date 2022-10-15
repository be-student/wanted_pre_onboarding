import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Announce } from '@typeormEntity/Announce.entity';
import { User } from '@typeormEntity/User.entity';
import { Repository } from 'typeorm';
import { CreateApplication } from './dto/createApplication';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Announce)
    private readonly announceRepository: Repository<Announce>,
  ) {}
  async create(createApplication: CreateApplication) {
    const announce = await this.announceRepository.findOne({
      where: {
        id: createApplication.getApplicationId(),
      },
    });
    if (!announce) {
      throw new NotFoundException('announce not found');
    }
    const user = await this.userRepository.findOne({
      where: {
        id: createApplication.getUserId(),
      },
      relations: ['announces'],
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (!user.announces) {
      user.announces = [];
    }
    for (let i = 0; i < user.announces.length; i++) {
      if (user.announces[i]?.id === announce.id) {
        return user;
      }
    }
    user.announces.push(announce);
    return await this.userRepository.save(user);
  }
}
