/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import Events from '../Events';
import { IUserSocket } from '../IClientSocket';

interface IDeviceStartStreamingUserData {
  deviceId: string;
}

interface IDeviceStartStreamingDeviceData {
  userId: string;
}

const deviceStartStreaming = {
  subject: Events.DeviceStartStreaming,
  listen: (socket: IUserSocket, log: (...msg: any[]) => void) => (data: IDeviceStartStreamingUserData) => {
    const deviceData: IDeviceStartStreamingDeviceData = {
      userId: socket.userId!,
    };

    socket.to(data.deviceId).emit(Events.DeviceStartStreaming, deviceData);

    log('The user with ID', socket.userId, ' sent a StartStreaming to the device', data.deviceId);
  },
};

export default deviceStartStreaming;
