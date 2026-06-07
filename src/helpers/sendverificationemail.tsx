import {resend} from "@/lib/resend";

import VerificationEmail from "../../emails/Verificationemails";    
import { Apiresponse } from "@/types/Apiresponse";

export async function sendVerificationEmail(
            email:string,
            username:string,
            verifyCode:string
): Promise <Apiresponse>{
    try {
        const data = await resend.emails.send({
  from: "onboarding@resend.dev",
  to: email,
  subject: "Mystry message | Verification code",
 react: <VerificationEmail username={username} otp={verifyCode} />,
});

console.log("RESEND RESPONSE:", data);
         return {success:true,message:"Verificaton email send successfully"}
    }
    catch(emailerror){
        console.error("Error sending verification email",
            emailerror)
            return {success:false,message:"Failed to send verification email"}
    }
}