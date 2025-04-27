import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ContactService } from "./contact.service";

const createContact = catchAsync(async (req, res) => {
  if (req.file) {
    req.body.photo = `/uploads/${req.file.filename}`;
  }

  const result = await ContactService.createContactIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    message: "Contact is created successfully!",
    data: result,
  });
});

export const ContactController = {
  createContact,
};
