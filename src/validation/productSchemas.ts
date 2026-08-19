import { z } from "zod";

export const productSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  photo: z.string().url("Invalid URL"),
  name: z.string().min(1, "Name is required"),
  suppliers: z.string().min(1, "Supplier is required"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  price: z.number().positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
});

export type CreateProductData = z.infer<typeof productSchema>;
