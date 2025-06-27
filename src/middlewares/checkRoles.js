import createHttpError from 'http-errors';
import { ROLES } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contact.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;

    if (!user) {
      next(createHttpError(401, 'User not found'));
      return;
    }

    const { role } = user;

    if (roles.includes(ROLES.ADMIN) && role === ROLES.ADMIN) {
      next();
      return;
    }

    if (roles.includes(ROLES.USER) && role === ROLES.USER) {
      const { contactId } = req.params;

      if (!contactId) {
        return next();
      }

      const contact = await ContactsCollection.findOne({
        _id: contactId,
        userId: user._id,
      });

      if (contact) {
        next();
        return;
      }
    }
    next(createHttpError(403, 'Forbidden'));
  };
