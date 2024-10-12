import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(params: {
  to: string;
  from: string;
  subject: string;
  html: string;
}) {
  const { to, from, subject, html } = params;

  console.log(`Attempting to send email to ${to} from ${from}`);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Error from Resend:", error);
      throw new Error(`Resend API error: ${error.message}`);
    }

    console.log("Email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(
      `Error sending email: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
