import OrderItem from '../../../domain/entity/order-item';
import Order from '../../../domain/entity/order';

import OrderService from '../../../domain/service/order.service';
import Customer from '../../../domain/entity/customer';

describe('Order service unit tests', () => {
  it('should return total of orders', () => {
    const item1 = new OrderItem('i1', 'Item 1', 100, 'p1', 1);
    const item2 = new OrderItem('i2', 'Item 2', 200, 'p2', 2);

    const order1 = new Order('o1', 'c1', [item1]);
    const order2 = new Order('o2', 'c2', [item2]);
    const order3 = new Order('o3', 'c3', [item1, item2]);

    const total = OrderService.total([order1, order2, order3]);

    expect(total).toEqual(1000);
  });

  it('should place an order', () => {
    const customer = new Customer('c1', 'John');

    const item1 = new OrderItem('i1', 'Item 1', 100, 'p1', 1);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(50);
    expect(order.total()).toBe(100);
  });

  it('should throw an error if order is empty of items', () => {
    const expectedErrorMessage = 'Order must contain at least one item';

    expect(() => {
      const customer = new Customer('c1', 'John');
      const order = OrderService.placeOrder(customer, []);
    }).toThrowError(expectedErrorMessage);
  });

  it('should throw an error if customer is not active', () => {
    const expectedErrorMessage = 'Customer must be active';

    expect(() => {
      const customer = new Customer('c1', 'John');
      const item1 = new OrderItem('i1', 'Item 1', 100, 'p1', 1);
      customer.deactivate();
      const order = OrderService.placeOrder(customer, [item1]);
    }).toThrowError(expectedErrorMessage);
  });
});
