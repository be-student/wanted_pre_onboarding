import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Announce } from './Announce.entity';
import { DateEntity } from './Date.entity';

@Entity()
export class User extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Announce)
  @JoinTable()
  announces: Announce[];
}
