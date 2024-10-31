
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './Users.model';
import { DocumentType } from './DocumentTypes.model';

@Table
export class DriverDocument extends Model<DriverDocument> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => DocumentType)
  @Column
  documentTypeId: number;

  @Column({ type: 'blob' })
  documentImage: Buffer;

  @Column({ type: 'timestamp' })
  expirationDate: Date;
}
