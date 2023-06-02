import Address from '../../../../domain/entity/address';
import CustomerAddressChanged from '../../../../domain/event/@shared/customer/customer-address-changed.event';
import CustomerCreatedEvent from '../../../../domain/event/@shared/customer/customer-created.event';
import CustomerAddressHasChangedHandler from '../../../../domain/event/@shared/customer/handler/customer-address-has-changed-handler.event';
import CustomerCreatedHandlerOne from '../../../../domain/event/@shared/customer/handler/customer-created-handler-one.event';
import CustomerCreatedHandlerTwo from '../../../../domain/event/@shared/customer/handler/customer-created-handler-two.event';
import EventDispatcher from '../../../../domain/event/@shared/event-dispatcher';
import SendEmailWhenProductIsCreatedHandler from '../../../../domain/event/@shared/product/handler/send-email-when-product-is-created.handler';
import ProductCreatedEvent from '../../../../domain/event/@shared/product/product-created.event';

describe('Domain event tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const productEventHandler = new SendEmailWhenProductIsCreatedHandler();
    const customerEventHandlerOne = new CustomerCreatedHandlerOne();
    const customerEventHandlerTwo = new CustomerCreatedHandlerTwo();
    const customerAddressChanged = new CustomerAddressHasChangedHandler();

    eventDispatcher.register('ProductCreatedEvent', productEventHandler);
    eventDispatcher.register('CustomerCreatedEvent', customerEventHandlerOne);
    eventDispatcher.register('CustomerCreatedEvent', customerEventHandlerTwo);
    eventDispatcher.register('CustomerAddressChanged', customerAddressChanged);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent']
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent']
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChanged']
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length
    ).toBe(2);
    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
    ).toMatchObject(productEventHandler);
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]
    ).toMatchObject(customerEventHandlerOne);
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]
    ).toMatchObject(customerEventHandlerTwo);
    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChanged'][0]
    ).toMatchObject(customerAddressChanged);
  });

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const productEventHandler = new SendEmailWhenProductIsCreatedHandler();
    const customerEventHandlerOne = new CustomerCreatedHandlerOne();
    const customerEventHandlerTwo = new CustomerCreatedHandlerTwo();
    const customerAddressChanged = new CustomerAddressHasChangedHandler();

    eventDispatcher.register('ProductCreatedEvent', productEventHandler);
    eventDispatcher.register('CustomerCreatedEvent', customerEventHandlerOne);
    eventDispatcher.register('CustomerCreatedEvent', customerEventHandlerTwo);
    eventDispatcher.register('CustomerAddressChanged', customerAddressChanged);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent']
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent']
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChanged']
    ).toBeDefined();

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length
    ).toBe(2);
    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChanged'].length
    ).toBe(1);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
    ).toMatchObject(productEventHandler);
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]
    ).toMatchObject(customerEventHandlerOne);
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]
    ).toMatchObject(customerEventHandlerTwo);
    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChanged'][0]
    ).toMatchObject(customerAddressChanged);

    eventDispatcher.unregister('ProductCreatedEvent', productEventHandler);
    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent']
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
      0
    );

    eventDispatcher.unregister('CustomerCreatedEvent', customerEventHandlerOne);
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length
    ).toBe(1);

    eventDispatcher.unregister(
      'CustomerAddressChanged',
      customerAddressChanged
    );
    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChanged'].length
    ).toBe(0);
  });

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const productEventHandler = new SendEmailWhenProductIsCreatedHandler();
    const productEventHandler2 = new SendEmailWhenProductIsCreatedHandler();
    const productEventHandler3 = new SendEmailWhenProductIsCreatedHandler();
    const customerEventHandlerOne = new CustomerCreatedHandlerOne();
    const customerEventHandlerTwo = new CustomerCreatedHandlerTwo();
    const customerAddressChanged = new CustomerAddressHasChangedHandler();

    eventDispatcher.register('ProductCreatedEvent', productEventHandler);
    eventDispatcher.register('ProductCreatedEvent', productEventHandler2);
    eventDispatcher.register('ProductCreatedEvent', productEventHandler3);
    eventDispatcher.register('CustomerCreatedEvent', customerEventHandlerOne);
    eventDispatcher.register('CustomerCreatedEvent', customerEventHandlerTwo);
    eventDispatcher.register('CustomerAddressChanged', customerAddressChanged);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
      3
    );

    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length
    ).toBe(2);

    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChanged'].length
    ).toBe(1);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
    ).toMatchObject(productEventHandler);
    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][1]
    ).toMatchObject(productEventHandler2);

    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]
    ).toMatchObject(customerEventHandlerOne);
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]
    ).toMatchObject(customerEventHandlerTwo);

    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChanged'][0]
    ).toMatchObject(customerAddressChanged);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent']
    ).toBeUndefined();
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent']
    ).toBeUndefined();
    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChanged']
    ).toBeUndefined();
  });

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const productEventHandler = new SendEmailWhenProductIsCreatedHandler();
    const customerEventHandlerOne = new CustomerCreatedHandlerOne();
    const customerEventHandlerTwo = new CustomerCreatedHandlerTwo();
    const customerAddressChanged = new CustomerAddressHasChangedHandler();
    const spyProductEventHandler = jest.spyOn(productEventHandler, 'handle'); //tells jest to spy if eventHandler.handle is called
    const spyCustomerEventHandlerOne = jest.spyOn(
      customerEventHandlerOne,
      'handle'
    );
    const spyCustomerEventHandlerTwo = jest.spyOn(
      customerEventHandlerTwo,
      'handle'
    );
    const spyCustomerAddressChanged = jest.spyOn(
      customerAddressChanged,
      'handle'
    );

    eventDispatcher.register('ProductCreatedEvent', productEventHandler);
    eventDispatcher.register('CustomerCreatedEvent', customerEventHandlerOne);
    eventDispatcher.register('CustomerCreatedEvent', customerEventHandlerTwo);
    eventDispatcher.register('CustomerAddressChanged', customerAddressChanged);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
      1
    );

    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length
    ).toBe(2);

    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChanged'].length
    ).toBe(1);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
    ).toMatchObject(productEventHandler);

    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]
    ).toMatchObject(customerEventHandlerOne);
    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]
    ).toMatchObject(customerEventHandlerTwo);

    expect(
      eventDispatcher.getEventHandlers['CustomerAddressChanged'][0]
    ).toMatchObject(customerAddressChanged);

    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
    });

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: 'Test Customer',
    });

    const customerAddressChangedEvent = new CustomerAddressChanged({
      id: '1',
      name: 'Test Customer',
      address: createTestAddress(),
    });

    // When notify is called, the SendEmailWhenProductIsCreatedHandler.handle() method should be called
    eventDispatcher.notify(productCreatedEvent);
    eventDispatcher.notify(customerCreatedEvent);
    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyProductEventHandler).toHaveBeenCalled();
    expect(spyCustomerEventHandlerOne).toHaveBeenCalled();
    expect(spyCustomerEventHandlerTwo).toHaveBeenCalled();
    expect(spyCustomerAddressChanged).toHaveBeenCalled();
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
