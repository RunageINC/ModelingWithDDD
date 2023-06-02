import Order from '../../../domain/entity/order';
import OrderItem from '../../../domain/entity/order-item';

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    const expectedErrorMessage = 'Id is empty and it is required';

    expect(() => {
      let order = new Order('', '123', []);
    }).toThrowError(expectedErrorMessage);
  });

  it('should throw error when customer id is empty', () => {
    const expectedErrorMessage = 'Customer Id is empty and it is required';

    expect(() => {
      let order = new Order('123', '', []);
    }).toThrowError(expectedErrorMessage);
  });

  it('should throw error when items list is empty', () => {
    const expectedErrorMessage =
      'Items list is empty and must be greater than 0';

    expect(() => {
      let order = new Order('123', '123', []);
    }).toThrowError(expectedErrorMessage);
  });

  it('should calculate total', () => {
    const order = new Order('123', '123', [
      new OrderItem('123', '123', 10, 'p1', 1),
      new OrderItem('123', '123', 20, 'p2', 1),
      new OrderItem('123', '123', 30, 'p3', 1),
    ]);

    const total = order.total();

    expect(total).toBe(60);

    const order2 = new Order('123', '123', [
      new OrderItem('123', '123', 60, 'p1', 1),
      new OrderItem('123', '123', 60, 'p2', 1),
    ]);

    const total2 = order2.total();

    expect(total2).toBe(120);
  });

  it('should calculate total when items list has different quantities', () => {
    const order = new Order('123', '123', [
      new OrderItem('123', '123', 10, 'p1', 2),
      new OrderItem('123', '123', 20, 'p2', 4),
      new OrderItem('123', '123', 30, 'p3', 3),
    ]);

    const total = order.total();

    expect(total).toBe(190);
  });

  it('should check if the quantity of items is not greater than 0', () => {
    const expectedErrorMessage = 'Quantity must be greater than 0';

    expect(() => {
      const order = new Order('123', '123', [
        new OrderItem('123', '123', 10, 'p1', 1),
        new OrderItem('123', '123', 20, 'p2', 1),
        new OrderItem('123', '123', 30, 'p3', 0),
      ]);
    }).toThrowError(expectedErrorMessage);
  });
});
