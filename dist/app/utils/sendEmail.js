"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const config_1 = __importDefault(require("../config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (to, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp-relay.brevo.com",
        port: 2525,
        secure: false,
        auth: {
            user: config_1.default.sendEmail.brevo_email,
            pass: config_1.default.sendEmail.brevo_pass,
        },
    });
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date());
    const field = (label, value) => value
        ? `<p style="text-align: left; line-height: 28px; color: #000;">
          <strong style="color: #121849;">${label}:</strong> ${value}
        </p>`
        : "";
    const html = `
  <div style="max-width: 600px; margin: 0 auto; background-color: #f3f4fa; color: #333; border-radius: 8px; padding: 24px;">
    <table style="width: 100%;">
      <tr>
        <td>
          <img src="https://i.ibb.co/m528rJkY/logo.png" alt="logo" style="height: 40px; margin-bottom: 16px;" />
        </td>
        <td style="text-align: right; color: #999;">${formattedDate}</td>
      </tr>
    </table>

    <h2 style="text-align: center; color: #122e5b;">User Contact Information</h2>
    <div style="padding: 0 1em;">
      ${field("Name", payload === null || payload === void 0 ? void 0 : payload.fullName)}
      ${field("Email", payload === null || payload === void 0 ? void 0 : payload.email)}
      ${field("Date of Birth", payload === null || payload === void 0 ? void 0 : payload.dateOfBirth)}
      ${field("Place of Birth", payload === null || payload === void 0 ? void 0 : payload.placeOfBirth)}
      ${field("Time of Birth", payload === null || payload === void 0 ? void 0 : payload.timeOfBirth)}
      ${field("Partner Name", payload === null || payload === void 0 ? void 0 : payload.partnerName)}
      ${field("Partner Date of Birth", payload === null || payload === void 0 ? void 0 : payload.partnerDateOfBirth)}
      ${field("Partner Time of Birth", payload === null || payload === void 0 ? void 0 : payload.partnerTimeOfBirth)}
      ${field("Partner Place of Birth", payload === null || payload === void 0 ? void 0 : payload.partnerPlaceOfBirth)}
      ${field("Hope to Learn", (payload === null || payload === void 0 ? void 0 : payload.hopeToLearn) || (payload === null || payload === void 0 ? void 0 : payload.whatToLearn))}
      ${field("Like to Focus", payload === null || payload === void 0 ? void 0 : payload.likeToFocus)}
      ${field("Date Ranges", payload === null || payload === void 0 ? void 0 : payload.dateRanges)}
      ${field("Type of Activity", payload === null || payload === void 0 ? void 0 : payload.typeOfActivity)}
      ${field("Details", payload === null || payload === void 0 ? void 0 : payload.whatToLearnDetails)}
    </div>

    <hr style="margin: 24px 0;" />

    <div style="text-align: center;">
      <a href="https://www.facebook.com" style="margin: 0 8px;">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width="24" />
      </a>
      <a href="https://www.youtube.com" style="margin: 0 8px;">
        <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" width="24" />
      </a>
      <a href="https://www.linkedin.com" style="margin: 0 8px;">
        <img src="https://cdn-icons-png.flaticon.com/512/1384/1384014.png" alt="LinkedIn" width="24" />
      </a>
      <a href="https://www.instagram.com" style="margin: 0 8px;">
        <img src="https://cdn-icons-png.flaticon.com/512/1384/1384015.png" alt="Instagram" width="24" />
      </a>
    </div>
  </div>
  `;
    yield transporter.sendMail({
        from: `Support Team <${config_1.default.sendEmail.email_from}>`,
        to: config_1.default.sendEmail.email_from,
        subject: "User Contact Info",
        text: `User Contact Info\n\nName: ${payload.fullName || ""}\nEmail: ${payload.email || ""}`,
        html,
    });
});
exports.sendEmail = sendEmail;
