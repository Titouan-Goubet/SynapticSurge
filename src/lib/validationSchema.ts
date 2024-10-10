import { z } from "zod";

// Schéma de base pour email et mot de passe
const baseAuthSchema = z.object({
  email: z
    .string()
    .email("Veuillez entrer un email valide")
    .min(5, "Votre email est trop court")
    .max(100, "Votre email est trop long"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(50, "Le mot de passe ne doit pas dépasser 50 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
});

// Schéma pour la connexion
export const loginSchema = baseAuthSchema;

// Schéma pour l'inscription
export const registerSchema = baseAuthSchema
  .extend({
    username: z
      .string()
      .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
      .max(30, "Le nom d'utilisateur ne doit pas dépasser 30 caractères"),
    confirmPassword: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .max(50, "Le mot de passe ne doit pas dépasser 50 caractères"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export const emailSchema = z.object({
  email: z.string().email("Veuillez entrer un email valide"),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(8, "Le mot de passe actuel est requis"),
    newPassword: z
      .string()
      .min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères"),
    confirmNewPassword: z
      .string()
      .min(8, "Confirmez votre nouveau mot de passe"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmNewPassword"],
  });

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type EmailFormType = z.infer<typeof emailSchema>;
export type PasswordFormType = z.infer<typeof passwordSchema>;
