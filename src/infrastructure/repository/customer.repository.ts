import Address from '../../domain/entity/address';
import Customer from '../../domain/entity/customer';
import CustomerRepositoryInterface from '../../domain/repository/customer-repository.interface';
import CustomerModel from '../db/sequelize/model/customer.model';

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      city: entity.address.city,
      state: entity.address.state,
      zipcode: entity.address.zip,
      country: entity.address.country,
      latitude: entity.address.latitude,
      longitude: entity.address.longitude,
      rewardPoints: entity.rewardPoints,
      active: entity.isActive(),
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        city: entity.address.city,
        state: entity.address.state,
        zipcode: entity.address.zip,
        country: entity.address.country,
        latitude: entity.address.latitude,
        longitude: entity.address.longitude,
        rewardPoints: entity.rewardPoints,
        active: entity.isActive(),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async delete(id: string): Promise<void> {
    await CustomerModel.destroy({ where: { id } });
  }

  async find(id: string): Promise<Customer> {
    let customerModel;

    try {
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error('Customer not found for given id');
    }

    const foundCustomer = new Customer(customerModel.id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.city,
      customerModel.state,
      customerModel.zipcode,
      customerModel.country,
      customerModel.latitude,
      customerModel.longitude
    );

    foundCustomer.changeAddress(address);

    return foundCustomer;
  }

  async findAll(): Promise<Customer[]> {
    const customers = await CustomerModel.findAll();

    return customers.map((customer) => {
      const foundCustomer = new Customer(customer.id, customer.name);
      const address = new Address(
        customer.street,
        customer.number,
        customer.city,
        customer.state,
        customer.zipcode,
        customer.country,
        customer.latitude,
        customer.longitude
      );

      foundCustomer.changeAddress(address);

      return foundCustomer;
    });
  }
}
