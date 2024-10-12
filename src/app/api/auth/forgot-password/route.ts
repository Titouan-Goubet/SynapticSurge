import { sendEmail } from "@/lib/send-email";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { error: "Aucun utilisateur trouvé avec cet email." },
        { status: 404 }
      );
    }

    const resetToken = uuidv4();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 heure

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiry },
    });

    await sendEmail({
      to: email,
      from: process.env.EMAIL_FROM!,
      subject: "Réinitialisation de votre mot de passe",
      html: `
        <p>Vous avez demandé une réinitialisation de votre mot de passe.</p>
        <p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p>
        <a href="${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}">Réinitialiser mon mot de passe</a>
        <p>Ce lien expirera dans 1 heure.</p>
        <p>Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet e-mail.</p>
      `,
    });

    return NextResponse.json({
      message: "Un email de réinitialisation a été envoyé.",
    });
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'email de réinitialisation:",
      error
    );
    return NextResponse.json(
      {
        error:
          "Une erreur est survenue lors de l'envoi de l'email de réinitialisation.",
      },
      { status: 500 }
    );
  }
}
