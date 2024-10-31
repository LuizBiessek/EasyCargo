// src/models/freight-offer.model.ts
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Company } from './Companies.model';
import { LoadingLocation } from './LoadingLocations.model';

@Table
export class FreightOffer extends Model<FreightOffer> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @ForeignKey(() => LoadingLocation)
  @Column
  loadingLocationId: number;

  @Column
  cargoType: string;

  @Column
  cargoWeight: number;

  @Column
  requiresSpecialDocuments: boolean;

  @Column
  vehicleAvailability: string;

  @Column
  freightValue: number;

  @Column({ type: 'timestamp' })
  departureDate: Date;

  @Column({ type: 'timestamp' })
  deliveryDate: Date;

  @Column
  deliveryAddress: string;
}
