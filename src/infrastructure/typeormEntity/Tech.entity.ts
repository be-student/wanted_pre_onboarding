import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Announce } from './Announce.entity';

@Entity()
export class Tech {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Announce)
  @JoinTable()
  announces: Announce[];
}
