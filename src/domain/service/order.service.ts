import Customer from '../entity/customer';
import Order from '../entity/order';
import OrderItem from '../entity/order-item';

import crypto from 'crypto';

export default class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error('Order must contain at least one item');
    }

    if (!customer.isActive()) {
      throw new Error('Customer must be active');
    }

    const order = new Order(this.uuid(), customer.id, items);

    customer.addRewardPoints(order.total() / 2);

    return order;
  }

  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }

  private static uuid() {
    return crypto.randomUUID();
  }
}
