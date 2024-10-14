import { Button } from "@/components/ui/button";
import { ThemeCard } from "@/components/ui/card-theme";
import { BookOpen, Gamepad, Globe, PlusCircle } from "lucide-react";
import Link from "next/link";

export function HomePage() {
  const themes = [
    {
      title: "Culture Générale",
      description: "Testez vos connaissances",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      title: "Géographie",
      description: "Explorez le monde à travers des quiz",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      title: "Jeux Vidéo",
      description: "Plongez dans l'univers du gaming",
      icon: <Gamepad className="h-6 w-6" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Choisissez votre thème de Quiz
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mb-8">
        {themes.map((theme, index) => (
          <ThemeCard key={index} {...theme} />
        ))}
      </div>
      <div className="text-center">
        <Link href="/quiz/create" passHref>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <PlusCircle className="mr-2 h-4 w-4" /> Créer votre propre quiz
          </Button>
        </Link>
      </div>
    </div>
  );
}
