import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId =
  (idName = 'id') =>
  (req, res, next) => {
    if (!isValidObjectId(req.params[idName])) {
      throw createHttpError(400, `Invalid MongoDB id: ${idName}`);
    }
    next();
  };
