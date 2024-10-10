import { loginSchema } from "@/lib/validationSchema";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

interface User {
  id: string;
  email: string;
}

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials) {
          throw new Error("Aucune information d'identification fournie");
        }

        const parsedCredentials = loginSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          throw new Error("Informations d'identification invalides");
        }

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("Informations d'identification invalides");
        }

        const passwordCorrect = await compare(password, user.password);
        if (!passwordCorrect) {
          throw new Error("Informations d'identification invalides");
        }

        return {
          id: user.id.toString(),
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 30 jours
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
