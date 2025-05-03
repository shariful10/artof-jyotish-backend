import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MailService } from "./mail.service";

const sendMail = catchAsync(async (req, res) => {
  await MailService.sendMailToAdmin(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Email sent to admin successfully!",
    data: null,
  });
});

export const MailController = {
  sendMail,
};
