/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import DomainEvent from '../../domain/bus/DomainEvent';
import IDomainEventSubscriber from '../../domain/bus/IDomainEventSubscriber';
import IEventBus from '../../domain/bus/IEventBus';

type Subscription = {
  boundedCallback: Function;
  originalCallback: Function;
};

class InMemorySyncEventBus implements IEventBus {
  private subscriptions: Map<string, Array<Subscription>>;

  constructor() {
    this.subscriptions = new Map();
  }

  async publish(events: Array<DomainEvent>): Promise<void> {
    const executions: any = [];
    events.map((event) => {
      const subscribers = this.subscriptions.get(event.eventName);
      if (subscribers) {
        return subscribers.map((subscriber) => executions.push(subscriber.boundedCallback(event)));
      }
    });

    await Promise.all(executions);
  }

  addSubscribers(subscribers: Array<IDomainEventSubscriber<DomainEvent>>) {
    subscribers.map((subscriber) =>
      subscriber.subscribedTo().map((event) => this.subscribe(event.EVENT_NAME!, subscriber)));
  }

  private subscribe(topic: string, subscriber: IDomainEventSubscriber<DomainEvent>): void {
    const currentSubscriptions = this.subscriptions.get(topic);
    const subscription = {
      boundedCallback: subscriber.on.bind(subscriber), originalCallback: subscriber.on,
    };
    if (currentSubscriptions) {
      currentSubscriptions.push(subscription);
    } else {
      this.subscriptions.set(topic, [subscription]);
    }
  }
}

export default InMemorySyncEventBus;
