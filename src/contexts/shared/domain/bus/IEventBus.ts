/* eslint-disable no-unused-vars */
import DomainEvent from './DomainEvent';
import IDomainEventSubscriber from './IDomainEventSubscriber';

interface IEventBus {
  publish(events: Array<DomainEvent>): Promise<void>;
  addSubscribers(subscribers: Array<IDomainEventSubscriber<DomainEvent>>): void;
}

export default IEventBus;
