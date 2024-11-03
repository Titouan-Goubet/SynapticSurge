import prisma from "@/lib/db/prisma";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "./zod/validationSchema";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        // Validation des credentials avec Zod côté backend
        const parsedCredentials = loginSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          return null; // Retourner null si validation échoue
        }

        const { email, password } = parsedCredentials.data;

        // Requête Prisma pour vérifier si l'utilisateur existe
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return null; // Retourner null si utilisateur introuvable
        }

        // Vérification du mot de passe
        const passwordCorrect = await compare(password, user.password);
        if (!passwordCorrect) {
          return null; // Retourner null si mot de passe incorrect
        }

        // Retourner un objet User avec l'ID
        return {
          id: user.id.toString(), // Conversion de l'ID en string
          email: user.email,
        };
      },
    }),
  ],
};
