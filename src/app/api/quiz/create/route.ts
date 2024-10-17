gimport prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, theme, description, questions } = await req.json();

    const quiz = await prisma.quiz.create({
      data: {
        title,
        theme,
        description,
        questions: {
          create: questions.map(
            (q: {
              text: string;
              options: string[];
              correctOptionIndex: number;
            }) => ({
              text: q.text,
              options: q.options,
              correctOptionIndex: q.correctOptionIndex,
            })
          ),
        },
      },
      include: {
        questions: true,
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
