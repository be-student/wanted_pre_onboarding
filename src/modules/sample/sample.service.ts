import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sample } from './entities';

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(Sample) private sampleRepository: Repository<Sample>,
  ) {}

  async create() {
    const sampleUser = new Sample();
    sampleUser.firstName = 'sample';
    sampleUser.lastName = 'user';
    await this.sampleRepository.save(sampleUser);
    return 'This action adds a new sample';
  }

  async findAll() {
    const sampleUsers = await this.sampleRepository.find();
    return JSON.stringify(sampleUsers);
  }

  async findOne(id: number) {
    const sampleUser = await this.sampleRepository.findOne({
      where: { id: id },
    });
    return sampleUser;
  }

  async remove(id: number) {
    await this.sampleRepository.delete({ id: id });
    return `This action removes a #${id} sample`;
  }
}
