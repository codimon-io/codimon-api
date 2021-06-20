import faker from 'faker';
// eslint-disable-next-line sort-imports
import Device from '../../domain/Device';
import DeviceId from '../../domain/DeviceId';
import IDeviceRepository from '../../domain/IDeviceRepository';

class FakeDeviceRepository implements IDeviceRepository {
  // eslint-disable-next-line class-methods-use-this
  async get(id: DeviceId): Promise<Device> {
    const newDevice = Device.fromJSON({
      id: id.value,
      name: faker.name.firstName(),
    });

    return newDevice;
  }
}

export const fakeDeviceRepository = new FakeDeviceRepository();

export default FakeDeviceRepository;
