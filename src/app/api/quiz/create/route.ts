import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { title, theme, description, questions } = await req.json();

  try {
    const quiz = await prisma.quiz.create({
      data: {
        title,
        theme,
        description,
        author: { connect: { email: session.user.email! } },
        questions: {
          create: questions.map(
            (q: {
              text: string;
              options: string[];
              correctOptionIndex: number;
            }) => ({
              text: q.text,
              options: {
                create: q.options.map((optionText: string, index: number) => ({
                  text: optionText,
                  isCorrect: index === q.correctOptionIndex,
                })),
              },
            })
          ),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Quiz créé avec succès",
        quiz: quiz,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création du quiz:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de la création du quiz" },
      { status: 500 }
    );
  }
}
