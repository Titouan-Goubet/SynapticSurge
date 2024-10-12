"use client";

import { Button } from "@/components/ui/button";
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
import { registerSchema, RegisterSchemaType } from "@/lib/validationSchema";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function FormSignup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterSchemaType) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      setIsSubmitting(false);

      if (response.ok) {
        router.push("/");
        router.refresh();
      } else {
        setServerError(result.error || "Une erreur est survenue.");
      }
    } catch (error) {
      setIsSubmitting(false);
      setServerError("Une erreur inattendue est survenue.");
      console.error("Erreur lors de l'inscription : ", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full p-0 sm:p-4">
      <div className="w-full sm:max-w-md p-6 sm:p-8 bg-white rounded-lg shadow-md h-full sm:h-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-black sm:text-2xl">
          Inscription
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base sm:text-lg text-black">
                    Nom d&apos;utilisateur
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="w-full text-black p-4 sm:p-3"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base sm:text-lg text-black">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      className="w-full text-black p-4 sm:p-3"
                    />
                  </FormControl>
                  <FormDescription>
                    Votre email ne sera jamais partagé
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base sm:text-lg text-black">
                    Mot de passe
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="w-full text-black p-4 sm:p-3"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Votre mot de passe doit contenir au moins 8 caractères, une
                    majuscule et un chiffre
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base sm:text-lg text-black">
                    Confirmer le mot de passe
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="w-full text-black p-4 sm:p-3"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Retaper votre mot de passe pour confirmer
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {serverError && (
              <p className="text-red-500 text-center">{serverError}</p>
            )}
            <Button
              type="submit"
              className="w-full p-4 sm:p-3 bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="spinner mr-2"></div>
                  Chargement...
                </div>
              ) : (
                "S'inscrire"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
