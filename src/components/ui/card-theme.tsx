import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ThemeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function ThemeCard({ title, description, icon }: ThemeCardProps) {
  return (
    <Card className="w-[350px] bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full">Lancer le quiz</Button>
      </CardContent>
    </Card>
  );
}
