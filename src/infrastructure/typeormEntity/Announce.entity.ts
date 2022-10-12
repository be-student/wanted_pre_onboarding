import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnnounceAdditional } from './AnnounceAdditional.entity';
import { DateEntity } from './Date.entity';
import { Tech } from './Tech.entity';
import { User } from './User.entity';

@Entity()
export class Announce extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: string;

  @Column()
  content: string;

  @OneToMany(
    (type) => AnnounceAdditional,
    (announceAdditional) => announceAdditional.announce,
  )
  additionals: AnnounceAdditional[];

  @ManyToMany(() => User)
  users: User[];

  @ManyToMany(() => Tech)
  techs: Tech[];
}
