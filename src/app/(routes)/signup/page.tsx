import FormSignup from "@/components/form-signup";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  // Si l'utilisateur est déjà connecté, on le redirige vers la page d'accueil
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return <FormSignup />;
}
