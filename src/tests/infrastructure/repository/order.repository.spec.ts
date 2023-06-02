import { Sequelize } from 'sequelize-typescript';
import Address from '../../../domain/entity/address';
import Customer from '../../../domain/entity/customer';
import Order from '../../../domain/entity/order';
import OrderItem from '../../../domain/entity/order-item';
import Product from '../../../domain/entity/product';
import CustomerModel from '../../../infrastructure/db/sequelize/model/customer.model';
import OrderItemModel from '../../../infrastructure/db/sequelize/model/order-item.model';
import OrderModel from '../../../infrastructure/db/sequelize/model/order.model';
import ProductModel from '../../../infrastructure/db/sequelize/model/product.model';
import CustomerRepository from '../../../infrastructure/repository/customer.repository';
import OrderRepository from '../../../infrastructure/repository/order.repository';
import ProductRepository from '../../../infrastructure/repository/product.repository';

describe('Order repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      OrderModel,
      OrderItemModel,
      ProductModel,
      CustomerModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should be able to create a new order', async () => {
    const customer = await createCustomer();
    const product = await createProduct('1', 100);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: product.name,
          price: product.price,
          order_id: order.id,
          product_id: orderItem.productId,
          quantity: orderItem.quantity,
        },
      ],
    });
  });

  it('should be able to update an order', async () => {
    const customer = await createCustomer();
    const product1 = await createProduct('1', 100);

    const orderItem1 = new OrderItem(
      '1',
      product1.name,
      product1.price,
      product1.id,
      2
    );

    const order = new Order('1', customer.id, [orderItem1]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem1.id,
          name: product1.name,
          price: product1.price,
          order_id: order.id,
          product_id: orderItem1.productId,
          quantity: orderItem1.quantity,
        },
      ],
    });

    const product2 = await createProduct('2', 175);
    const orderItem2 = new OrderItem(
      '2',
      product2.name,
      product2.price,
      product2.id,
      3
    );

    order.items.push(orderItem2);

    await orderRepository.update(order);

    const updatedOrder = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(updatedOrder.items.length).toBe(2);
    expect(updatedOrder.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem1.id,
          name: product1.name,
          price: product1.price,
          order_id: order.id,
          product_id: orderItem1.productId,
          quantity: orderItem1.quantity,
        },
        {
          id: orderItem2.id,
          name: product2.name,
          price: product2.price,
          order_id: order.id,
          product_id: orderItem2.productId,
          quantity: orderItem2.quantity,
        },
      ],
    });
  });

  it('should delete an order', async () => {
    const customer = await createCustomer();
    const product = await createProduct('1', 100);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: product.name,
          price: product.price,
          order_id: order.id,
          product_id: orderItem.productId,
          quantity: orderItem.quantity,
        },
      ],
    });

    await orderRepository.delete(order.id);

    expect(await OrderModel.findOne({ where: { id: order.id } })).toBeNull();
  });

  it('should find an existant order by id', async () => {
    const customer = await createCustomer();
    const product = await createProduct('1', 100);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    const foundOrder = await orderRepository.find(order.id);

    expect(foundOrder.items.length).toBe(1);
    expect(orderModel.toJSON()).toStrictEqual({
      id: foundOrder.id,
      customer_id: foundOrder.customerId,
      total: foundOrder.total(),
      items: [
        {
          id: foundOrder.items[0].id,
          name: product.name,
          price: product.price,
          order_id: order.id,
          product_id: foundOrder.items[0].productId,
          quantity: foundOrder.items[0].quantity,
        },
      ],
    });
  });

  it('should find find all orders', async () => {
    const customer = await createCustomer();
    const product1 = await createProduct('1', 100);
    const product2 = await createProduct('2', 175);
    const product3 = await createProduct('3', 250);
    const product4 = await createProduct('4', 300);

    const orderItem1 = new OrderItem(
      '1',
      product1.name,
      product1.price,
      product1.id,
      2
    );
    const orderItem2 = new OrderItem(
      '2',
      product2.name,
      product2.price,
      product2.id,
      10
    );
    const orderItem3 = new OrderItem(
      '3',
      product3.name,
      product3.price,
      product3.id,
      5
    );
    const orderItem4 = new OrderItem(
      '4',
      product4.name,
      product4.price,
      product4.id,
      1
    );

    const order1 = new Order('1', customer.id, [orderItem1, orderItem2]);
    const order2 = new Order('2', customer.id, [orderItem3, orderItem4]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders.length).toBe(2);
  });

  async function createCustomer(): Promise<Customer> {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John');
    const address = new Address(
      'Main street',
      123,
      'Main city',
      'Main state',
      'Main zip',
      'Main country',
      12.0,
      10.0
    );
    customer.changeAddress(address);

    await customerRepository.create(customer);

    return customer;
  }

  async function createProduct(id: string, price: number): Promise<Product> {
    const productRepository = new ProductRepository();
    const product = new Product(id, `Product ${id}`, price);

    productRepository.create(product);

    return product;
  }
});
