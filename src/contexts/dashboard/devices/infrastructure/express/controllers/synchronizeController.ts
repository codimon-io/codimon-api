import { NextFunction, Request, Response } from 'express';
import Synchronize, { ISynchronizeData } from '../../../application/Synchronize';
import DeviceId from '../../../domain/DeviceId';
import DeviceName from '../../../domain/DeviceName';
import { fakeDeviceRepository } from '../../repository/FakeDeviceRepository';
import Presenter from '../../../../../shared/infrastructure/express/Presenter';

interface IRequestDTO {
  name: string;
}

async function synchronizeController(
  request: Request, response: Response, next: NextFunction,
): Promise<void> {
  try {
    const { id } = request.params;

    const requestDTO: IRequestDTO = request.body;

    const presenter = new Presenter(response);

    const synchronize = new Synchronize(
      fakeDeviceRepository,
      presenter,
    );

    const data: ISynchronizeData = {
      deviceId: DeviceId.create(id),
      deviceName: DeviceName.create(requestDTO.name),
    };

    await synchronize.execute(data);
  } catch (error) {
    next(error);
  }
}

export default synchronizeController;
