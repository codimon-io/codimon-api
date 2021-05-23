/* eslint-disable sort-imports */
import debug from 'debug';
import http from 'http';
import { Server } from 'socket.io';
import config from '../config';
import ExpressApp from '../express/ExpressApp';

import pkg from '../../../package.json';

const logger = debug('server:infrastructure:socket:SocketApp');

class SocketApp {
  private expressApp: ExpressApp;

  private httpApp: http.Server;

  private io: Server;

  constructor(expressApp: ExpressApp) {
    this.expressApp = expressApp;

    this.httpApp = http.createServer(expressApp.app);

    this.io = new Server(this.httpApp);
  }

  private initIo(): void {
    this.io.on('connection', (socket: any) => {
      logger('a user connected', socket.id);
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

    this.initIo();

    this.listen();
  }
}

export default SocketApp;
