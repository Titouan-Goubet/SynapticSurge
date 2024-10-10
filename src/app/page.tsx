import { ThemeCard } from "@/components/ui/card-theme";
import { BookOpen, Gamepad, Globe } from "lucide-react";

export default function Home() {
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
    <>
      <h1 className="text-4xl font-bold text-center mb-8">
        Choisissez votre thème de Quiz
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {themes.map((theme, index) => (
          <ThemeCard key={index} {...theme} />
        ))}
      </div>
    </>
  );
}
