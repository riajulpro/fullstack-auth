import User from "@/models/user.model"; // Corrected import statement
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedToken = await bcrypt.hash(userId.toString(), salt);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "5db180b1f97b1d",
        pass: "887d2f60ba65b4",
      },
    });

    const mailOptions = {
      from: "riajulpro.english@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>You should ${
        emailType === "VERIFY" ? "verify your account" : "reset your password"
      } by click <a href={${
        emailType === "VERIFY"
          ? `${process.env.DOMAIN}/verify-email?token=${hashedToken}`
          : `${process.env.DOMAIN}/reset-password?token=${hashedToken}`
      }}>here</a></p><p>Or copy the link: ${
        emailType === "VERIFY"
          ? `${process.env.DOMAIN}/verify-email?token=${hashedToken}`
          : `${process.env.DOMAIN}/reset-password?token=${hashedToken}`
      }</p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.error("Email sending failed!", error);
    throw error;
  }
};
