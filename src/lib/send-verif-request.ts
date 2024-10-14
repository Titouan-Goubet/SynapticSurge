import SignInEmail from "@/components/emails/signin";
import { render } from "@react-email/render";
import React from "react";
import { sendEmail } from "./send-email";

export async function sendVerificationRequest(params: {
  identifier: string;
  url: string;
  provider: { from: string };
}) {
  console.log("Verification URL:", params.url);
  const { identifier, url, provider } = params;
  const { from } = provider;

  const emailHtml = render(React.createElement(SignInEmail, { url }));

  await sendEmail({
    to: identifier,
    from,
    subject: "Connexion à votre compte SynapticSurge",
    html: emailHtml,
  });
}
