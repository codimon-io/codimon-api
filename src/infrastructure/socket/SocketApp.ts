/* eslint-disable sort-imports */
import debug from 'debug';
import http from 'http';
import { Server, Socket } from 'socket.io';
import config from '../config';
import ExpressApp from '../express/ExpressApp';
import { IUserSocket, IDeviceSocket } from './IClientSocket';
import userIdentify from './listeners/userIdentify';
import deviceIdentify from './listeners/deviceIdentify';
import deviceRemoteControl from './listeners/deviceRemoteControl';
import deviceStartStreaming from './listeners/deviceStartStreaming';
import deviceStopStreaming from './listeners/deviceStopStreaming';
import deviceStreaming from './listeners/deviceStreaming';
import Events from './Events';

import pkg from '../../../package.json';

const logger = debug('server:infrastructure:socket:SocketApp');

interface IListener {
  subject: Events|string;
  // eslint-disable-next-line no-unused-vars
  listen(socket: IDeviceSocket|IUserSocket|Socket, log: any): (data: any) => void;
}

class SocketApp {
  private expressApp: ExpressApp;

  private httpApp: http.Server;

  private deviceListeners: IListener[]

  public io: Server;

  constructor(expressApp: ExpressApp, deviceListeners: IListener[]) {
    this.expressApp = expressApp;

    this.httpApp = http.createServer(expressApp.app);

    this.io = new Server(this.httpApp, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    this.deviceListeners = [
      ...deviceListeners,
      userIdentify,
      deviceIdentify,
      deviceRemoteControl,
      deviceStartStreaming,
      deviceStopStreaming,
      deviceStreaming,
    ];
  }

  private setListeners(): void {
    this.io.on('connection', (socket: IDeviceSocket|IUserSocket|Socket) => {
      logger('New connection with ID', socket.id);

      // eslint-disable-next-line no-param-reassign
      (socket as IDeviceSocket|IUserSocket).isIdentified = false;

      socket.on('disconnect', () => {
        logger('The connections with ID', socket.id, 'is disconnected');
      });

      this.deviceListeners.forEach((event) => {
        socket.on(event.subject, event.listen(socket, logger));
      });
    });
  }

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

    this.setListeners();

    this.listen();
  }
}

export default SocketApp;
