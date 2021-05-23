import AggregateRoot from '../../domain/entities/AggregateRoot';
import IPresenter from '../../domain/IPresenter';
/* eslint-disable import/order */
import { Response } from 'express';

class Presenter implements IPresenter {
  private response: Response;

  constructor(response: Response) {
    this.response = response;
  }

  returnNewEntity(object: AggregateRoot): void {
    this.response
      .status(201)
      .json(object.toJSON());
  }

  returnEntity(object: AggregateRoot): void {
    this.response
      .status(200)
      .json(object.toJSON());
  }

  returnList(object: any[]): void {
    this.response
      .status(202)
      .json(object);
  }

  returnEmpty(): void {
    this.response
      .status(204)
      .send();
  }
}

export default Presenter;
