import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Announce } from './Announce.entity';
import { DateEntity } from './Date.entity';

@Entity()
export class AnnounceAdditional extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  content: string;

  @ManyToOne((type) => Announce, (announce) => announce.additionals, {
    onDelete: 'CASCADE',
  })
  announce: Announce;
}
