import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

interface QuizFormActionsProps {
  isSubmitting: boolean;
}

export default function QuizFormActions({
  isSubmitting,
}: QuizFormActionsProps) {
  const { setValue, getValues } = useFormContext();

  const addQuestion = () => {
    const currentQuestions = getValues("questions");
    setValue("questions", [
      ...currentQuestions,
      { text: "", options: ["", "", "", ""], correctOptionIndex: 0 },
    ]);
  };

  return (
    <div className="flex justify-between items-center mt-8">
      <Button type="button" variant="outline" onClick={addQuestion}>
        Ajouter une question
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Création en cours..." : "Créer le quiz"}
      </Button>
    </div>
  );
}
