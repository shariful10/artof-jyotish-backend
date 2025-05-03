import nodemailer from "nodemailer";
import config from "../config";
import { TMail } from "../modules/mail/mail.interface";

export const sendEmail = async (to: string, payload: TMail) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production",
    auth: {
      user: config.auth_user,
      pass: config.auth_pass,
    },
  });

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

  const field = (label: string, value?: string) =>
    value
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
      ${field("Name", payload?.fullName)}
      ${field("Email", payload?.email)}
      ${field("Date of Birth", payload?.dateOfBirth)}
      ${field("Place of Birth", payload?.placeOfBirth)}
      ${field("Hope to Learn", payload?.hopeToLearn || payload?.whatToLearn)}
      ${field("Like to Focus", payload?.likeToFocus)}
      ${field("Date Ranges", payload?.dateRanges)}
      ${field("Details", payload?.whatToLearnDetails)}
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

  await transporter.sendMail({
    from: config.auth_user,
    to,
    subject: "User Contact Info",
    text: `User Contact Info\n\nName: ${payload.fullName || ""}\nEmail: ${
      payload.email || ""
    }`,
    html,
  });
};
