import { resend } from "@/lib/resend";
import verificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/apiResponse";


export async function sendVerificationEmail(email: string, username: string, verificationCode: string): Promise<ApiResponse> 
{
try {
    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Anonymous Review Verification Code',
        react: verificationEmail({ username: username, otp: verificationCode }),
      });


    return {
        success: true,
        message: "Verification Email sent successfully",
    }
    
} catch (emailError) {
    console.error("Error sending verification Email: ",emailError);
    return {
        success: false,
        message: "Error sending verification Email",
    }
}
}

