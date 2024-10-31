import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { FreightOffer } from './FreightOffers.model';
import { Driver } from './Drivers.model';

@Table
export class FreightRequest extends Model<FreightRequest> {
  @ForeignKey(() => FreightOffer)
  @Column({ primaryKey: true })
  freightOfferId: number;

  @ForeignKey(() => Driver)
  @Column({ primaryKey: true })
  driverId: number;

  @Column({ type: 'timestamp', defaultValue: new Date() })
  requestDate: Date;

  @Column
  status: string;
}
