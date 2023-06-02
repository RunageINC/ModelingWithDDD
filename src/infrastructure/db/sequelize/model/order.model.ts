import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import CustomerModel from './customer.model';
import OrderItemModel from './order-item.model';

@Table({
  tableName: 'orders',
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column
  declare total: number;

  @ForeignKey(() => CustomerModel)
  @Column
  declare customer_id: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => OrderItemModel, {
    onDelete: 'CASCADE',
  })
  declare items: OrderItemModel[];
}
