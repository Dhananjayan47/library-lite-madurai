import sgMail from "@sendgrid/mail"
import type {MailDataRequired} from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

interface MailOptions{
    to:string;
    subject:string;
    text?:string;
    html?:string;
}

export const sendMail = async ({to,subject,text,html}:MailOptions) => {

    try {
        if (!text && !html) {
  throw new Error("Either text or html is required");
}
        const msg:MailDataRequired ={
            to,
            from: `Madurai District Library<${process.env.SENDGRID_FROM_EMAIL as string}>`,
            subject,
            content: [
                {
                  type: html ? "text/html" : "text/plain",
                  value: html || text!,
                },
              ],
        };

        await sgMail.send(msg);
    } catch (error:any) {
        console.error("SendGrid Error:", error.response?.body || error.message);
    throw new Error("Email sending failed");
    }
    
}