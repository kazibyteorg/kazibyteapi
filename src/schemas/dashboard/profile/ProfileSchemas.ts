import { z } from "zod";

export const ProfileSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
    role: z.enum(["admin", "user", "editor"]).default("user"),
    status: z.enum(["active", "inactive"]).default("active"),
    bio: z.string().min(10).max(200).optional(),
    avatar: z
      .string()
      .url("Invalid URL")
      .optional()
      .default("https://i.pravatar.cc/300"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
