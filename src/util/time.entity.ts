import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class TimeEntity extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
