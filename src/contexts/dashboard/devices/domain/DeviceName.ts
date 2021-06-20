import StringValueObject from '../../../shared/domain/valueObject/StringValueObject';

class DeviceName extends StringValueObject {
  static create(value: string): DeviceName {
    return new DeviceName(value);
  }
}

export default DeviceName;
