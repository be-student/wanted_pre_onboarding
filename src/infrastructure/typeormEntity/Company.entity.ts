import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Announce } from './Announce.entity';
import { CompanyAdditional } from './CompanyAdditional.entity';
import { DateEntity } from './Date.entity';

@Entity()
export class Company extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    (type) => CompanyAdditional,
    (companyAdditional) => companyAdditional.company,
    { onDelete: 'CASCADE' },
  )
  additionals: CompanyAdditional[];

  @OneToMany((type) => Announce, (announce) => announce.company, {
    onDelete: 'CASCADE',
  })
  announces: Announce[];
}
