import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (id) => {
  const contact = await ContactsCollection.findById(id);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (id, payload) => {
  const updatedContact = await ContactsCollection.findByIdAndUpdate(
    id,
    payload,
    { new: true },
  );

  return updatedContact;
};

export const deleteContact = async (id) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: id,
  });
  return contact;
};
