/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { IUserSocket } from '../IClientSocket';
import Subjects from '../Subjects';

interface IDeviceStopStreamingUserData {
  deviceId: string;
}

interface IDeviceStopStreamingDeviceData {
  userId: string;
}

const deviceStopStreaming = {
  subject: Subjects.DeviceStopStreaming,
  listen: (socket: IUserSocket, log: (...msg: any[]) => void) => (data: IDeviceStopStreamingUserData) => {
    const deviceData: IDeviceStopStreamingDeviceData = {
      userId: socket.userId!,
    };

    socket.to(data.deviceId).emit(Subjects.DeviceStopStreaming, deviceData);

    log('The user with ID', socket.userId, ' sent a StopStreaming to the device', data.deviceId);
  },
};

export default deviceStopStreaming;
