import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuizFormValues } from "@/lib/zod/validationSchema";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import QuizQuestion from "./quiz-question";

export default function QuizQuestions() {
  const [activeTab, setActiveTab] = useState(0);
  const { watch } = useFormContext<QuizFormValues>();

  const questions = watch("questions");

  return (
    <Tabs
      value={activeTab.toString()}
      onValueChange={(value: string) => setActiveTab(parseInt(value))}
    >
      <TabsList>
        {questions.map((_, index) => (
          <TabsTrigger key={index} value={index.toString()}>
            Question {index + 1}
          </TabsTrigger>
        ))}
      </TabsList>
      {questions.map((question, index) => (
        <TabsContent key={index} value={index.toString()}>
          <QuizQuestion index={index} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
