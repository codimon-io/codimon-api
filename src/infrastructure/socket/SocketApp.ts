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

interface ClientSocket extends Socket {
  clientType?: string;
}

interface DeviceSocket extends ClientSocket {
  deviceId?: string;
}

interface UserSocket extends ClientSocket {
  userId?: string;
}

class SocketApp /* implements IEventBus */ {
  private expressApp: ExpressApp;

  private httpApp: http.Server;

  public io: Server;

  constructor(expressApp: ExpressApp) {
    this.expressApp = expressApp;

    this.httpApp = http.createServer(expressApp.app);

    this.io = new Server(this.httpApp, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });
  }

  // eslint-disable-next-line max-lines-per-function
  private initIo(): void {
    // eslint-disable-next-line max-lines-per-function
    this.io.on('connection', (socket: Socket|DeviceSocket|UserSocket) => {
      logger('New connection with ID', socket.id);

      let isIdentified: boolean = false;

      socket.on('disconnect', () => {
        logger('The connections with ID', socket.id, 'is disconnected');
      });

      socket.on('device:identify', (data: any) => {
        if (data.clientType !== 'device') return;

        if (isIdentified) return;

        isIdentified = true;

        const deviceSocket = socket as DeviceSocket;

        deviceSocket.clientType = 'device';

        deviceSocket.deviceId = data.deviceId;

        deviceSocket.join(deviceSocket.deviceId!);

        logger('The connections with ID', socket.id, ' is the device', deviceSocket.deviceId);
      });

      socket.on('user:identify', (data: any) => {
        if (data.clientType !== 'user') return;

        if (isIdentified) return;

        isIdentified = true;

        const userSocket = socket as UserSocket;

        userSocket.clientType = 'user';

        userSocket.userId = data.userId;

        socket.join(data.deviceIds);

        logger('The connections with ID', socket.id, ' is the user', userSocket.userId);
      });

      socket.on('user:remote-control', (data: any) => {
        const userSocket = socket as UserSocket;

        userSocket.to(data.deviceId).emit('user:remote-control', data.content);

        logger('The user with ID', userSocket.userId, ' sent a remote control to the device', data.deviceId);
      });
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
