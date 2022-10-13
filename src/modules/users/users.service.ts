import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@typeormEntity/User.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.name = createUserDto.getName();
    await this.userRepository.save(user);
    return user;
  }
  async test(dto: CreateUserDto) {
    return dto.getName();
  }
}
