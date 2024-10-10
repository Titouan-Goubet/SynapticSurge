"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, LoginSchemaType } from "@/lib/validationSchema";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchemaType) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      setIsSubmitting(false);

      if (response?.error) {
        setServerError(response.error);
      } else if (response?.ok) {
        router.push("/");
        router.refresh();
      } else {
        setServerError("Une erreur inattendue est survenue.");
      }
    } catch (error) {
      setIsSubmitting(false);
      setServerError("Une erreur inattendue est survenue.");
      console.error("Erreur lors de la soumission : ", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full  p-0 sm:p-4">
      <div className="w-full sm:max-w-md p-6 sm:p-8 bg-white rounded-lg shadow-md h-full sm:h-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-black sm:text-2xl">
          Connexion
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      required
                      type="email"
                      {...field}
                      className="w-full text-black p-4 sm:p-3"
                    />
                  </FormControl>
                  <FormMessage />
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
                        required
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
                  <FormMessage />

                  <div className="text-right">
                    <a
                      href="/forgot-password"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Mot de passe oublié ?
                    </a>
                  </div>
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
                "Se connecter"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
