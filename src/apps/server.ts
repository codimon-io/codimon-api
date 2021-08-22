/* eslint-disable sort-imports */
import deviceRouter from '../contexts/dashboard/devices/infrastructure/express/router';
import videoStreamingRouter from '../contexts/video-streaming/infrastructure/express/router';

import ExpressApp from '../infrastructure/express/ExpressApp';
import SocketApp from '../infrastructure/socket/SocketApp';

const httpServer = new ExpressApp([deviceRouter, videoStreamingRouter]);

const socketServer = new SocketApp(httpServer, []);

socketServer.start([]);

export default socketServer;
