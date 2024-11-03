"use client";

import { Card, CardContent } from "@/components/ui/card";
import { QuizFormValues, quizFormSchema } from "@/lib/zod/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import QuizDescription from "./quiz-description";
import QuizFormActions from "./quiz-form-actions";
import QuizQuestions from "./quiz-questions";
import QuizTheme from "./quiz-theme";
import QuizTitle from "./quiz-title";

export default function QuizForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      title: "",
      theme: "",
      description: "",
      questions: [
        {
          text: "",
          options: ["", "", "", ""],
          correctOptionIndex: 0,
        },
      ],
    },
    mode: "onChange",
  });

  const onSubmit = async (data: QuizFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/quiz/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        form.reset();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <QuizTitle />
            <QuizTheme />
            <QuizDescription />
            <QuizQuestions />
            <QuizFormActions isSubmitting={isSubmitting} />
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
