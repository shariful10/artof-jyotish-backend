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
  const contact = await Contact.isContactExists(contactId);

  if (
    contact?.photo &&
    contact?.photo.length > 0 &&
    updatedData?.photo?.length == 0
  ) {
    updatedData.photo = contact.photo;
  }

  const result = await Contact.findByIdAndUpdate(contactId, updatedData, {
    new: true,
  });
  return result;
};

const deleteContactFromDB = async (contactId: string) => {
  const contact = await Contact.isContactExists(contactId);

  if (!contact) {
    throw new AppError(StatusCodes.NOT_FOUND, "Contact does not exist!");
  }

  await Contact.findByIdAndDelete(contactId);
  return null;
};

export const ContactService = {
  createContactIntoDB,
  getAllContactsFromDB,
  updateContactIntoDB,
  deleteContactFromDB,
};
