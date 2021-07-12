import Events from '../Events';
import { IDeviceSocket } from '../IClientSocket';

interface IDeviceStreamingDeviceData {
  userId: string;
  imageBuffer: ArrayBuffer;
}

interface IDeviceStreamingUserData {
  imageBuffer: ArrayBuffer;
}

const deviceStreaming = {
  subject: Events.DeviceStreaming,
  listen: (socket: IDeviceSocket) => (data: IDeviceStreamingDeviceData) => {
    const deviceData: IDeviceStreamingUserData = {
      imageBuffer: data.imageBuffer,
    };

    socket.to(data.userId).emit(Events.DeviceStreaming, deviceData);
  },
};

export default deviceStreaming;
