import ResetPasswordEmail from "@/components/emails/forgot-password";
import { sendEmail } from "@/lib/send-email";
import { PrismaClient } from "@prisma/client";
import { render } from "@react-email/render";
import { NextResponse } from "next/server";
import React from "react";
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

    const resetLink = `${process.env.NEXTAUTH_URL}/forgot-password?token=${resetToken}`;
    const emailHtml = render(
      React.createElement(ResetPasswordEmail, { resetLink })
    );

    await sendEmail({
      to: email,
      from: process.env.EMAIL_FROM!,
      subject: "Réinitialisation de votre mot de passe SynapticSurge",
      html: emailHtml,
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
