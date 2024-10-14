import FormSignup from "@/components/form-signup";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return <FormSignup />;
}
