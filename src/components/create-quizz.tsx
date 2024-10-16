"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const quizFormSchema = z.object({
  title: z.string().min(2, {
    message: "Le titre du quiz doit contenir au moins 2 caractères.",
  }),
  theme: z.string().min(2, {
    message: "Le thème du quiz doit contenir au moins 2 caractères.",
  }),
  description: z.string().optional(),
  questions: z
    .array(
      z.object({
        text: z.string().min(1, "La question est requise"),
        options: z
          .array(z.string())
          .length(4, "Exactement 4 options sont requises"),
        correctOptionIndex: z.number().min(0).max(3),
      })
    )
    .min(1, "Au moins une question est requise"),
});

type QuizFormValues = z.infer<typeof quizFormSchema>;

const defaultValues: Partial<QuizFormValues> = {
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
};

export default function CreateQuizPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: QuizFormValues) {
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
        // Rajouter plus tard une redirection vers la page du quiz par ex
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const addQuestion = () => {
    const currentQuestions = form.getValues("questions");
    form.setValue("questions", [
      ...currentQuestions,
      { text: "", options: ["", "", "", ""], correctOptionIndex: 0 },
    ]);
    setActiveTab(currentQuestions.length);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center text-black mb-8">
        Créer un nouveau quiz
      </h1>
      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mt-10">
                    <FormLabel>Titre du quiz</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez le titre du quiz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thème du quiz</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez le thème du quiz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optionnelle)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Entrez une description pour votre quiz"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Tabs
                value={activeTab.toString()}
                onValueChange={(value: string) => setActiveTab(parseInt(value))}
              >
                <TabsList>
                  {form.watch("questions").map((_, index) => (
                    <TabsTrigger key={index} value={index.toString()}>
                      Question {index + 1}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {form.watch("questions").map((_, index) => (
                  <TabsContent key={index} value={index.toString()}>
                    <FormField
                      control={form.control}
                      name={`questions.${index}.text`}
                      render={({ field }) => (
                        <FormItem className="mb-6">
                          <FormLabel>Question {index + 1}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Entrez votre question"
                              className="bg-primary/5 border-primary/20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {[0, 1, 2, 3].map((optionIndex) => (
                      <FormField
                        key={optionIndex}
                        control={form.control}
                        name={`questions.${index}.options.${optionIndex}`}
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <FormLabel className="text-sm text-muted-foreground">
                              Option {optionIndex + 1}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={`Option ${optionIndex + 1}`}
                                className="bg-secondary/10 border-secondary/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                    <FormField
                      control={form.control}
                      name={`questions.${index}.correctOptionIndex`}
                      render={({ field }) => (
                        <FormItem className="space-y-3 mt-6 p-4 bg-muted rounded-md">
                          <FormLabel>Réponse correcte</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) =>
                                field.onChange(parseInt(value))
                              }
                              defaultValue={field.value.toString()}
                              className="flex flex-col space-y-1"
                            >
                              {[0, 1, 2, 3].map((optionIndex) => (
                                <FormItem
                                  className="flex items-center space-x-3 space-y-0"
                                  key={optionIndex}
                                >
                                  <FormControl>
                                    <RadioGroupItem
                                      value={optionIndex.toString()}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Option {optionIndex + 1}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                ))}
              </Tabs>
              <Button type="button" variant="outline" onClick={addQuestion}>
                Ajouter une question
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Création en cours..." : "Créer le quiz"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
