import Customer from './domain/entity/customer';
import Address from './domain/entity/address';
import OrderItem from './domain/entity/order-item';
import Order from './domain/entity/order';

let customer = new Customer('123', 'John Doe');
const address = new Address(
  'Main St',
  123,
  'Hollywood',
  'Kansas',
  '1234567',
  'USA',
  13.36,
  -12.0
);

customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem('1', 'Item 1', 10, '1', 1);
const item2 = new OrderItem('2', 'Item 2', 10, '1', 1);

const order = new Order('1', '123', [item1, item2]);
