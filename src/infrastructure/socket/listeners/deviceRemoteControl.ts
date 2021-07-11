/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { IUserSocket } from '../IClientSocket';
import Subjects from '../Subjects';

interface IDeviceRemoteControlUserData {
  deviceId: string;
  content: any
}

interface IDeviceRemoteControlDeviceData {
  content: any
}

const deviceRemoteControl = {
  subject: Subjects.DeviceRemoteControl,
  listen: (socket: IUserSocket, log: (...msg: any[]) => void) => (data: IDeviceRemoteControlUserData) => {
    const deviceData: IDeviceRemoteControlDeviceData = {
      content: data.content,
    };

    socket.to(data.deviceId).emit(Subjects.DeviceRemoteControl, deviceData);

    log('The user with ID', socket.userId, ' sent a remote control to the device', data.deviceId);
  },
};

export default deviceRemoteControl;
