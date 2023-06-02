import Customer from '../../../domain/entity/customer';
import Address from '../../../domain/entity/address';

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    const expectedErrorMessage = 'ID not informed, and it is required';

    expect(() => {
      let customer = new Customer('', 'John');
    }).toThrowError(expectedErrorMessage);
  });

  it('should throw error when name is empty', () => {
    const expectedErrorMessage = 'Name not informed, and it is required';

    expect(() => {
      let customer = new Customer('123', '');
    }).toThrowError(expectedErrorMessage);
  });

  it('should change name', () => {
    //Arrange
    const customer = new Customer('123', 'John');

    //Act
    customer.changeName('Jane');

    //Assert
    expect(customer.name).toBe('Jane');
  });

  it('should activate customer', () => {
    const customer = new Customer('123', 'John');
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

    expect(customer.isActive()).toBe(true);
  });

  it('should deactivate customer', () => {
    const customer = new Customer('123', 'John');

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it('should throw error when address is undefined', () => {
    expect(() => {
      const customer = new Customer('1', 'customer');

      customer.activate();
    }).toThrowError('Address not initialized, and it is required');
  });

  it('should add reward points to customer', () => {
    const customer = new Customer('123', 'John');
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

    expect(customer.rewardPoints).toBe(0);

    customer.changeAddress(address);

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(10);
  });
});
