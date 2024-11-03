import { registerSchema } from "@/lib/zod/validationSchema";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Données reçues:", body);
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      // Si la validation échoue, retourne les erreurs
      return NextResponse.json(
        { error: "Validation échouée", details: result.error.errors },
        { status: 400 }
      );
    }

    const { email, password, username } = result.data;

    // Hacher le mot de passe
    const hashedPassword = await hash(password, 10);

    // Insérer l'utilisateur dans la base de données avec Prisma
    try {
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      // Nous ne renvoyons pas le mot de passe haché dans la réponse
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = newUser;

      return NextResponse.json(
        { message: "Inscription réussie", user: userWithoutPassword },
        { status: 201 }
      );
    } catch (error: unknown) {
      // Gérer les erreurs spécifiques de Prisma (erreur de duplication)
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        // P2002 est le code d'erreur Prisma pour duplication de clé unique
        const field = (error.meta?.target as string[])?.[0] ?? "Un champ";
        return NextResponse.json(
          { error: `${field} est déjà utilisé.` },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "Une erreur est survenue lors de l'inscription." },
        { status: 500 }
      );
    }
  } catch (e) {
    console.error("Erreur inattendue:", e);
    return NextResponse.json(
      { error: "Erreur inattendue, veuillez réessayer." },
      { status: 500 }
    );
  }
}
