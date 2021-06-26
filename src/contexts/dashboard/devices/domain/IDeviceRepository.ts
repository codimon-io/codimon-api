/* eslint-disable no-unused-vars */
import Device from './Device';
import DeviceId from './DeviceId';

interface IDeviceRepository {
  get(id: DeviceId): Promise<Device>;
  // save(device: Device): Promise<void>;
}

export default IDeviceRepository;
