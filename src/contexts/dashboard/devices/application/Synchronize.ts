import DeviceId from '../domain/DeviceId';
import DeviceName from '../domain/DeviceName';
import IDeviceRepository from '../domain/IDeviceRepository';
import IPresenter from '../../../shared/domain/IPresenter';

export interface ISynchronizeData {
  deviceId: DeviceId;
  deviceName: DeviceName;
}

class Synchronize {
  private deviceRepository: IDeviceRepository;

  private presenter: IPresenter;

  constructor(deviceRepository: IDeviceRepository, presenter: IPresenter) {
    this.deviceRepository = deviceRepository;

    this.presenter = presenter;
  }

  async execute(data: ISynchronizeData): Promise<void> {
    const { deviceId } = data;

    const device = await this.deviceRepository.get(deviceId);

    this.presenter.returnEntity(device);
  }
}

export default Synchronize;
