import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyAdditional } from './CompanyAdditional.entity';
import { DateEntity } from './Date.entity';

@Entity()
export class Company extends DateEntity {
  @PrimaryColumn()
  name: string;

  @OneToMany(
    (type) => CompanyAdditional,
    (companyAdditional) => companyAdditional.company,
  )
  additionals: CompanyAdditional[];
}
