"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function VerifyRequest() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Vérification en cours...</p>;
  }

  return (
    <div>
      <h1>Vérification de votre email</h1>
      <p>Veuillez patienter pendant que nous vérifions votre identité...</p>
    </div>
  );
}
