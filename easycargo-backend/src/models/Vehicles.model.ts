import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './Users.model';

@Table
export class Vehicle extends Model<Vehicle> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column
  ownerId: number;

  @Column
  type: string;

  @Column({ allowNull: true })
  brand: string;

  @Column
  modelDescription: string;

  @Column
  year: number;

  @Column
  registrationNumber: string;

  @Column
  registrationAddress: string;
}
