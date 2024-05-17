import { z } from "zod";

export const FAQSchemas = z.object({
  title: z.string().min(3).max(20).optional().default("Bangladesh "),
  description: z.string().min(10).max(80).optional(),
  question: z.string().min(10).max(80),
  answer: z.string().min(10).max(300),
});
