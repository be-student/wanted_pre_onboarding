import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './Company.entity';
import { DateEntity } from './Date.entity';

@Entity()
export class CompanyAdditional extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  content: string;

  @ManyToOne((type) => Company, (company) => company.additionals, {
    onDelete: 'CASCADE',
  })
  company: Company;
}
