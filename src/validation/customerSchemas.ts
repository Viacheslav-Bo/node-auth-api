import { z } from "zod";

export const customerSchema = z.object({
  photo: z.string().url("Invalid photo URL").optional(),
  name: z.string().trim().min(2, "Name is too short"),
  email: z.string().email("Invalid email format"),
  spent: z.number().nonnegative("Spent must be a positive number").default(0),
  phone: z
    .string()
    .regex(/^\+380\d{9}$/, "Invalid phone format")
    .optional(),
  address: z.string().trim().min(5, "Address is too short").optional(),
});

export type CreateCustomerData = z.infer<typeof customerSchema>;
