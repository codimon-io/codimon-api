import DomainEvent from '../../domain/bus/DomainEvent';
import EventEmitterBus from './EventEmitterBus';
import IDomainEventSubscriber from '../../domain/bus/IDomainEventSubscriber';
import IEventBus from '../../domain/bus/IEventBus';

class InMemoryAsyncEventBus implements IEventBus {
  private bus: EventEmitterBus;

  constructor(subscribers: Array<IDomainEventSubscriber<DomainEvent>>) {
    this.bus = new EventEmitterBus(subscribers);
  }

  async publish(events: DomainEvent[]): Promise<void> {
    this.bus.publish(events);
  }

  addSubscribers(subscribers: Array<IDomainEventSubscriber<DomainEvent>>) {
    this.bus.registerSubscribers(subscribers);
  }
}

export default InMemoryAsyncEventBus;
