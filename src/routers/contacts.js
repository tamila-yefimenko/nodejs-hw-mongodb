import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContactsController,
  getContactsByIdController,
  createContactController,
  deleteContactController,
  updateContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authentificate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const contactsRouter = Router();

// contactsRouter.use('/:contactId', isValidId('contactId'));

contactsRouter.use(authentificate);

contactsRouter.get(
  '/',
  checkRoles(ROLES.ADMIN),
  ctrlWrapper(getContactsController),
);

contactsRouter.get(
  '/:contactId',
  isValidId('contactId'),
  checkRoles(ROLES.ADMIN, ROLES.USER),
  ctrlWrapper(getContactsByIdController),
);

contactsRouter.post(
  '/',
  checkRoles(ROLES.ADMIN, ROLES.USER),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/:contactId',
  isValidId('contactId'),
  checkRoles(ROLES.ADMIN, ROLES.USER),
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId('contactId'),
  checkRoles(ROLES.ADMIN),
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;
