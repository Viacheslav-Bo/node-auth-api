import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().trim().min(2),
  email: z.email("Invalid email address"),
  password: z.string().min(8),
  role: z.enum(["user", "admin"]),
});

export type CreateUserData = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  name: z.string().trim().min(2).optional(),
  email: z.email("Invalid email address").optional(),
  role: z.enum(["user", "admin"]).optional(),
});

export type UpdateUserData = z.infer<typeof updateUserSchema>;
