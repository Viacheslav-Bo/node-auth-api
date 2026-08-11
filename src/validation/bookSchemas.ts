import { z } from "zod";

export const createBookSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  author: z.string().trim().min(1, "Author is required"),
  pageCount: z.number().int().positive("Page count must be positive"),
});

export type CreateBookData = z.infer<typeof createBookSchema>;

export const updateBookSchema = createBookSchema.partial();

export type UpdateBookData = z.infer<typeof updateBookSchema>;
