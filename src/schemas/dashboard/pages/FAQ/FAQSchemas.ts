import { z } from "zod";

export const FAQSchemas = z.object({
  title: z.string().min(3).max(20),
  description: z.string().min(10).max(80),
  question: z.string().min(10).max(80),
  answer: z.string().min(10).max(300),
});
