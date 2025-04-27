import { TContact } from "./contact.interface";
import { Contact } from "./contact.model";

const createContactIntoDB = async (payload: TContact) => {
  const result = await Contact.create(payload);
  return result;
};

const getAllContactsFromDB = () => {
  const result = Contact.find();
  return result;
};

const updateContactIntoDB = async (
  contactId: string,
  updatedData: Partial<TContact>
) => {
  const result = await Contact.findByIdAndUpdate(contactId, updatedData, {
    new: true,
  });
  return result;
};

export const ContactService = {
  createContactIntoDB,
  getAllContactsFromDB,
  updateContactIntoDB,
};
