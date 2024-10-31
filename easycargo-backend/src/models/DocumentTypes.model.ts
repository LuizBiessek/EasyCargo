import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class DocumentType extends Model<DocumentType> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;
}
