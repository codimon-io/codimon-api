import ExpressApp from '../infrastructure/express/ExpressApp';

import SocketApp from '../infrastructure/socket/SocketApp';

const httpServer = new ExpressApp([]);

const socketServer = new SocketApp(httpServer);

socketServer.start([]);
