
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './Users.model';

@Table
export class Company extends Model<Company> {
  @ForeignKey(() => User)
  @Column
  id: number;

  @Column
  businessName: string;
}
