import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
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
  additionals: Company[];
}
