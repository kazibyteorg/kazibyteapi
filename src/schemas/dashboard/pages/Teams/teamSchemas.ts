import { z } from 'zod';

export const teamSchemas = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    image: z.string().url('Image must be a valid URL'),
    link: z.string().url('Link must be a valid URL'),
    status: z.string().min(1, 'Status is required'),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

