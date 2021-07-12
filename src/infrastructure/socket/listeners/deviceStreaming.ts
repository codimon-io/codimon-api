import { IDeviceSocket } from '../IClientSocket';
import Subjects from '../Subjects';

interface IDeviceStreamingDeviceData {
  userId: string;
  videoBuffer: any;
}

interface IDeviceStreamingUserData {
  videoBuffer: any;
}

const deviceStreaming = {
  subject: Subjects.DeviceStreaming,
  listen: (socket: IDeviceSocket) => (data: IDeviceStreamingDeviceData) => {
    const deviceData: IDeviceStreamingUserData = {
      videoBuffer: data.videoBuffer,
    };

    socket.to(data.userId).emit(Subjects.DeviceStreaming, deviceData);
  },
};

export default deviceStreaming;
