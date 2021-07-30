/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import Events from '../Events';
import { IUserSocket } from '../IClientSocket';

interface IDeviceMoveCameraUserData {
  deviceId: string;
  angle: number;
}

interface IDeviceMoveCameraDeviceData {
  angle: number;
}

const deviceMoveCamera = {
  subject: Events.DeviceMoveCamera,
  listen: (socket: IUserSocket, log: (...msg: any[]) => void) => (data: IDeviceMoveCameraUserData) => {
    const deviceData: IDeviceMoveCameraDeviceData = {
      angle: data.angle,
    };

    socket.to(data.deviceId).emit(Events.DeviceMoveCamera, deviceData);
  },
};

export default deviceMoveCamera;
