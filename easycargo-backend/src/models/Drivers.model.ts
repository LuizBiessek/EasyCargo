// src/models/driver.model.ts
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './Users.model';

@Table
export class Driver extends Model<Driver> {
  @ForeignKey(() => User)
  @Column
  id: number;

  @Column
  licenseNumber: string;

  @Column({ type: 'smallint' })
  averageRating: number;
}
