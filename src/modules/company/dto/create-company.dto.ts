import { IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  additional?: Array<{ [key: string]: string }>;
}
