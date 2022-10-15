import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnnounceAdditional } from './AnnounceAdditional.entity';
import { Company } from './Company.entity';
import { DateEntity } from './Date.entity';
import { Tech } from './Tech.entity';
import { User } from './User.entity';

@Entity()
export class Announce extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: string;

  @Column({ select: false })
  content: string;

  @OneToMany(
    (type) => AnnounceAdditional,
    (announceAdditional) => announceAdditional.announce,
    { onDelete: 'CASCADE' },
  )
  additionals: AnnounceAdditional[];

  @ManyToOne((type) => Company, (company) => company.announces, {
    onDelete: 'CASCADE',
  })
  company: Company;

  @ManyToMany(() => User)
  users: User[];

  @ManyToMany(() => Tech)
  techs: Tech[];
}
