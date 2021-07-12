import deviceRouter from '../contexts/dashboard/devices/infrastructure/express/router';
import ExpressApp from '../infrastructure/express/ExpressApp';
import SocketApp from '../infrastructure/socket/SocketApp';

const httpServer = new ExpressApp([deviceRouter]);

const socketServer = new SocketApp(httpServer, []);

socketServer.start([]);

export default socketServer;
