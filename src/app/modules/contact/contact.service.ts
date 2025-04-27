import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
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

const deleteContactFromDB = (contactId: string) => {
  const result = Contact.findByIdAndDelete(contactId);
  console.log(result);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Contact not found!");
  }

  return null;
};

export const ContactService = {
  createContactIntoDB,
  getAllContactsFromDB,
  updateContactIntoDB,
  deleteContactFromDB,
};
