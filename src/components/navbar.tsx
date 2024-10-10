import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-sm">
      <Link href="/" className="text-2xl font-bold">
        SynapticSurge
      </Link>
      <div className="space-x-4">
        <Button variant="ghost" asChild>
          <Link href="/quizzes">A propos</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/leaderboard">Classement</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/profile">Profil</Link>
        </Button>
      </div>
    </nav>
  );
}
