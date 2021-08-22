import Events from '../Events';
import { IDeviceSocket } from '../IClientSocket';
// eslint-disable-next-line max-len
// import streamingBus from '../../../contexts/video-streaming/infrastructure/streamingBus/streamingBus';

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

    // console.log('streaming');

    // streamingBus.emit(`${socket.deviceId}`, data.imageBuffer);

    socket.to(data.userId).emit(Events.DeviceStreaming, deviceData);
  },
};

export default deviceStreaming;
