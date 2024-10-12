import { sendEmail } from "./send-email";

export async function sendVerificationRequest(params: {
  identifier: string;
  url: string;
  provider: { from: string };
}) {
  const { identifier, url, provider } = params;
  const { from } = provider;

  await sendEmail({
    to: identifier,
    from,
    subject: "Sign in to your account",
    html: `<p>Click <a href="${url}">here</a> to sign in.</p>`,
  });
}
