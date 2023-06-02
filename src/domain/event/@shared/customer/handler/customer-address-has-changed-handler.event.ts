import EventHandlerInterface from '../../event-handler.interface';
import CustomerAddressChanged from '../customer-address-changed.event';

export default class CustomerAddressHasChangedHandler
  implements EventHandlerInterface<CustomerAddressChanged>
{
  handle(event: CustomerAddressChanged): void {
    const { id, name, address } = event.eventData;
    console.log(
      `Endereço do cliente: ${id} - ${name} alterado para ${address.toString()}`
    );
  }
}
