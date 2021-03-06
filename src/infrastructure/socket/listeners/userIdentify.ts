/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import Events from '../Events';
import { IUserSocket } from '../IClientSocket';

interface IUserIdentifyData {
  clientType: string;
  userId: string;
  deviceIds: string[];
}

const userIdentify = {
  subject: Events.UserIdentify,
  listen: (socket: IUserSocket, log: (...msg: any[]) => void) => (data: IUserIdentifyData) => {
    if (data.clientType !== 'user') return;

    if (socket.isIdentified) return;

    socket.isIdentified = true;

    socket.clientType = 'user';

    socket.userId = data.userId;

    socket.join([data.userId, ...data.deviceIds]);

    log('The connections with ID', socket.id, ' is the user', socket.userId);
  },
};

export default userIdentify;
