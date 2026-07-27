import { transporter } from "@/lib/nodemailer";
import { render } from "@react-email/render";
import VerificationEmail from "../../emails/Verificationemails";
import { Apiresponse } from "@/types/Apiresponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<Apiresponse> {
  try {
    const emailHtml = await render(
      <VerificationEmail username={username} otp={verifyCode} />
    );

    const data = await transporter.sendMail({
      from: `"Mystery Message" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Mystry message | Verification code",
      html: emailHtml,
    });

    console.log("NODEMAILER RESPONSE:", data);
    return { success: true, message: "Verification email sent successfully" };
  } catch (emailerror) {
    console.error("Error sending verification email", emailerror);
    return { success: false, message: "Failed to send verification email" };
  }
}