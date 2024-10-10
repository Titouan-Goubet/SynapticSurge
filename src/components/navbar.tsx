"use client";

import { Button } from "@/components/ui/button";
import { LogOutIcon, UserIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-sm">
      <Link href="/" className="text-2xl font-bold">
        SynapticSurge
      </Link>
      <div className="space-x-4 flex items-center">
        <Button variant="ghost" asChild>
          <Link href="/about">À propos</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/leaderboard">Classement</Link>
        </Button>
        {session ? (
          <>
            <Button variant="ghost" asChild>
              <Link href="/profile">
                <UserIcon className="mr-2 h-4 w-4" />
                Profil
              </Link>
            </Button>
            <Button variant="ghost" onClick={() => signOut()}>
              <LogOutIcon className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link href="/login">Connexion</Link>
            </Button>
            <Button variant="default" asChild>
              <Link href="/signup">Inscription</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
