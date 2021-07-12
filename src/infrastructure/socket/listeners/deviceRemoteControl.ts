/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import Events from '../Events';
import { IUserSocket } from '../IClientSocket';

interface IDeviceRemoteControlUserData {
  deviceId: string;
  content: any
}

interface IDeviceRemoteControlDeviceData {
  content: any
}

const deviceRemoteControl = {
  subject: Events.DeviceRemoteControl,
  listen: (socket: IUserSocket, log: (...msg: any[]) => void) => (data: IDeviceRemoteControlUserData) => {
    const deviceData: IDeviceRemoteControlDeviceData = {
      content: data.content,
    };

    socket.to(data.deviceId).emit(Events.DeviceRemoteControl, deviceData);

    log('The user with ID', socket.userId, ' sent a remote control to the device', data.deviceId);
  },
};

export default deviceRemoteControl;
