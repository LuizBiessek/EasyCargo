
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Company } from './Companies.model';

@Table
export class LoadingLocation extends Model<LoadingLocation> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @Column
  street: string;

  @Column
  number: string;

  @Column
  neighborhood: string;

  @Column
  city: string;

  @Column
  state: string;

  @Column
  country: string;

  @Column
  zipCode: string;
}
