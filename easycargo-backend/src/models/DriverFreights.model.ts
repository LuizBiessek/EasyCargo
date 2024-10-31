import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { FreightOffer } from './FreightOffers.model';

@Table
export class DriverFreight extends Model<DriverFreight> {
  @ForeignKey(() => FreightOffer)
  @Column({ primaryKey: true })
  freightOfferId: number;

  @Column
  status: string;
}
