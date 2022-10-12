import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class DateEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
