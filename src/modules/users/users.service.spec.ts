import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@typeormEntity/User.entity';
import { CreateUserDto } from './dto/createUserDto';
import { UsersService } from './users.service';
const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
});
describe('UsersService', () => {
  let service: UsersService;
  const user: User = new User();
  user.name = 'hello';
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save user', () => {
    const dto: CreateUserDto = new CreateUserDto('hello');
    service.create(dto).then((value) => {
      expect(value).toEqual(user);
    });
  });
});
