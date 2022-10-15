import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  public getName() {
    return this.name;
  }
}
