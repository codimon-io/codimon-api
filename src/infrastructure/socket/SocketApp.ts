/* eslint-disable sort-imports */
import debug from 'debug';
import http from 'http';
import { Server, Socket } from 'socket.io';
import config from '../config';
import ExpressApp from '../express/ExpressApp';
// import DomainEvent from '../../contexts/shared/domain/bus/DomainEvent';
// import IDomainEventSubscriber from '../../contexts/shared/domain/bus/IDomainEventSubscriber';
// import IEventBus from '../../contexts/shared/domain/bus/IEventBus';

import pkg from '../../../package.json';

const logger = debug('server:infrastructure:socket:SocketApp');

class SocketApp /* implements IEventBus */ {
  private expressApp: ExpressApp;

  private httpApp: http.Server;

  public io: Server;

  constructor(expressApp: ExpressApp) {
    this.expressApp = expressApp;

    this.httpApp = http.createServer(expressApp.app);

    this.io = new Server(this.httpApp);
  }

  // eslint-disable-next-line max-lines-per-function
  private initIo(): void {
    this.io.on('connection', (socket: Socket) => {
      logger('An user is connected', socket.id);

      socket.on('device:info', (data: any) => {
        logger('New received data', data);
      });
    });

    this.io.on('disconnect', (socket: Socket) => {
      logger('An user is disconnected', socket.id);
    });

    this.io.of(/^\/devices\/[A-Za-z0-9._-]+$/).on('connect', (socket) => {
      const newNamespace = socket.nsp;

      logger('a device %s connected to the namespace %s', socket.id, newNamespace.name);

      socket.on('device:info', (data: any) => {
        logger('New received data', data);
      });

      socket.on('disconnect', () => {
        logger('A device is disconnected', socket.id);
      });

      socket.emit('device:ready');
    });
  }

  /*
  async publish(events: DomainEvent[]): Promise<void> {
    // this.bus.publish(events);
  }

  addSubscribers(subscribers: Array<IDomainEventSubscriber<DomainEvent>>) {
    // this.bus.registerSubscribers(subscribers);
  }
  */

  public listen(): void {
    if (config.env !== 'test' && config.env !== 'test.local') {
      this.httpApp.listen(config.server.port, () => {
        logger(
          `${config.env} server v${pkg.version} running on port ${config.server.port}`,
        );
      });
    }
  }

  public async start(services: Promise<any>[]): Promise<void> {
    await this.expressApp.runServices(services);

    this.initIo();

    this.listen();
  }
}

export default SocketApp;
