import { Sequelize } from 'sequelize-typescript';
import Address from '../../../domain/entity/address';
import Customer from '../../../domain/entity/customer';

import CustomerModel from '../../../infrastructure/db/sequelize/model/customer.model';
import CustomerRepository from '../../../infrastructure/repository/customer.repository';

describe('Customer repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John');

    customer.changeAddress(createTestAddress());

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'John',
      street: 'Main street',
      number: 123,
      city: 'Main city',
      state: 'Main state',
      zipcode: 'Main zip',
      country: 'Main country',
      latitude: 12.0,
      longitude: 10.0,
      rewardPoints: 0,
      active: true,
    });
  });

  it('should update customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John');

    customer.changeAddress(createTestAddress());

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'John',
      street: 'Main street',
      number: 123,
      city: 'Main city',
      state: 'Main state',
      zipcode: 'Main zip',
      country: 'Main country',
      latitude: 12.0,
      longitude: 10.0,
      rewardPoints: 0,
      active: true,
    });

    customer.changeName('Jane Doe');
    customer.addRewardPoints(20);

    await customerRepository.update(customer);

    const updated = await CustomerModel.findOne({ where: { id: '1' } });

    expect(updated.toJSON()).toStrictEqual({
      id: '1',
      name: 'Jane Doe',
      street: 'Main street',
      number: 123,
      city: 'Main city',
      state: 'Main state',
      zipcode: 'Main zip',
      country: 'Main country',
      latitude: 12.0,
      longitude: 10.0,
      rewardPoints: 20,
      active: true,
    });
  });

  it('should find customer by id', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John');

    customer.changeAddress(createTestAddress());

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    const foundCustomer = await customerRepository.find(customerModel.id);

    expect(customerModel.toJSON()).toStrictEqual({
      id: foundCustomer.id,
      name: foundCustomer.name,
      street: foundCustomer.address.street,
      number: foundCustomer.address.number,
      city: foundCustomer.address.city,
      state: foundCustomer.address.state,
      zipcode: foundCustomer.address.zip,
      country: foundCustomer.address.country,
      latitude: foundCustomer.address.latitude,
      longitude: foundCustomer.address.longitude,
      rewardPoints: foundCustomer.rewardPoints,
      active: foundCustomer.isActive(),
    });
  });

  it('should delete customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John');

    customer.changeAddress(createTestAddress());

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'John',
      street: 'Main street',
      number: 123,
      city: 'Main city',
      state: 'Main state',
      zipcode: 'Main zip',
      country: 'Main country',
      latitude: 12.0,
      longitude: 10.0,
      rewardPoints: 0,
      active: true,
    });

    await customerRepository.delete(customer.id);

    const deletedCustomerModel = await CustomerModel.findOne({
      where: { id: '1' },
    });

    expect(deletedCustomerModel).toBeNull();
  });

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('1', 'John');
    customer.changeAddress(createTestAddress());
    await customerRepository.create(customer);

    const customer2 = new Customer('2', 'Jane');
    customer2.changeAddress(createTestAddress());
    await customerRepository.create(customer2);

    const customer3 = new Customer('3', 'Mary');
    customer3.changeAddress(createTestAddress());
    await customerRepository.create(customer3);

    const customer4 = new Customer('4', 'Mike');
    customer4.changeAddress(createTestAddress());
    await customerRepository.create(customer4);

    const customers = await CustomerModel.findAll();
    const foundCustomers = await customerRepository.findAll();

    expect(customers.length).toBe(4);
    expect(customers[0].toJSON()).toStrictEqual({
      id: foundCustomers[0].id,
      name: foundCustomers[0].name,
      street: foundCustomers[0].address.street,
      number: foundCustomers[0].address.number,
      city: foundCustomers[0].address.city,
      state: foundCustomers[0].address.state,
      zipcode: foundCustomers[0].address.zip,
      country: foundCustomers[0].address.country,
      latitude: foundCustomers[0].address.latitude,
      longitude: foundCustomers[0].address.longitude,
      rewardPoints: foundCustomers[0].rewardPoints,
      active: foundCustomers[0].isActive(),
    });
  });

  it('should throw error when customer does not exist', async () => {
    const expectedErrorMessage = 'Customer not found for given id';
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find('1');
    }).rejects.toThrow(expectedErrorMessage);
  });

  function createTestAddress(): Address {
    return new Address(
      'Main street',
      123,
      'Main city',
      'Main state',
      'Main zip',
      'Main country',
      12.0,
      10.0
    );
  }
});
