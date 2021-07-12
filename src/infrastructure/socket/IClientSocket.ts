import { Socket } from 'socket.io';

interface IClientSocket extends Socket {
  clientType?: string;
  isIdentified: boolean;
}

export interface IDeviceSocket extends IClientSocket {
  deviceId?: string;
}

export interface IUserSocket extends IClientSocket {
  userId?: string;
}

export default IClientSocket;
