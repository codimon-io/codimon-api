/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import Events from '../Events';
import { IDeviceSocket } from '../IClientSocket';

interface IDeviceIdentifyData {
  clientType: string;
  deviceId: string;
}

const deviceIdentify = {
  subject: Events.DeviceIdentify,
  listen: (socket: IDeviceSocket, log: (...msg: any[]) => void) => (data: IDeviceIdentifyData) => {
    if (data.clientType !== 'device') return;

    if (socket.isIdentified) return;

    socket.isIdentified = true;

    socket.clientType = 'device';

    socket.deviceId = data.deviceId;

    socket.join(socket.deviceId!);

    log('The connections with ID', socket.id, ' is the device', socket.deviceId);
  },
};

export default deviceIdentify;
