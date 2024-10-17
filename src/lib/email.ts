import nodemailer from "nodemailer";

export async function sendResetPasswordEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({});

  const resetUrl = `http://votre-site.com/reset-password?token=${token}`;

  await transporter.sendMail({
    from: '"Votre App" <noreply@votre-app.com>',
    to: email,
    subject: "Réinitialisation de votre mot de passe",
    html: `Cliquez sur ce lien pour réinitialiser votre mot de passe : <a href="${resetUrl}">${resetUrl}</a>`,
  });
}
