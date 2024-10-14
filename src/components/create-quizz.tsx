// app/create/quiz/page.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
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

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: QuizFormValues) {
    console.log(data);
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
      <Card>
        <CardHeader>
          <CardTitle>Créer un nouveau quiz</CardTitle>
          <CardDescription>
            Remplissez les informations pour créer votre quiz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre du quiz</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez le titre du quiz" {...field} />
                    </FormControl>
                    <FormDescription>
                      Choisissez un titre accrocheur pour votre quiz.
                    </FormDescription>
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
                    <FormDescription>
                      Choisissez un thème général pour votre quiz.
                    </FormDescription>
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
                    <FormDescription>
                      Vous pouvez ajouter une brève description de votre quiz.
                    </FormDescription>
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
                        <FormItem>
                          <FormLabel>Question {index + 1}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Entrez votre question"
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
                          <FormItem>
                            <FormLabel>Option {optionIndex + 1}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={`Option ${optionIndex + 1}`}
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
                        <FormItem className="space-y-3">
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
              <Button type="submit">Créer le quiz</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
