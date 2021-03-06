import { Request, Response } from 'express';

import Joi from 'joi';
import NotAcceptableError from '../../../../../infrastructure/express/errors/NotAcceptableError';

function validateBody(schema: Joi.ObjectSchema) {
  return (request: Request, response: Response, next: () => void) => {
    const { error, value } = schema.validate(request.body, { abortEarly: false });

    if (error) {
      const errorPayload = error.details.map((errorItem) => ({
        field: errorItem.context?.label,
        message: errorItem.message,
      }));

      throw new NotAcceptableError(errorPayload);
    } else {
      request.body = value;

      next();
    }
  };
}

export default validateBody;
