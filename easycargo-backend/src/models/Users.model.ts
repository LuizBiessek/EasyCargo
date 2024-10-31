// src/models/user.model.ts
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column({ unique: true })
  cpfCnpj: string;

  @Column
  street: string;

  @Column
  number: string;

  @Column
  city: string;

  @Column
  state: string;

  @Column
  country: string;

  @Column
  zipCode: string;

  @Column
  email: string;

  @Column
  phone: string;

  @Column({ defaultValue: new Date() })
  registrationDate: Date;
}
