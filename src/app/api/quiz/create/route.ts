import prisma from "@/lib/prisma";
import { QuizData } from "@/lib/types/QuizData";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, theme, description, questions }: QuizData = await req.json();

    const quiz = await prisma.quiz.create({
      data: {
        title,
        theme,
        description,
        questions: {
          create: questions.map((q) => ({
            text: q.text,
            correctOptionIndex: q.correctOptionIndex,
            options: {
              create: q.options.map((optionText) => ({
                text: optionText,
              })),
            },
          })),
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

    return NextResponse.json({ success: true, quiz }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du quiz:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de la création du quiz" },
      { status: 500 }
    );
  }
}
