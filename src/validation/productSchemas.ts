import { z } from "zod";

export const productSchema = z.object({
  id: z.string().min(1, "Product ID is required"),
  photo: z.string().url("Invalid URL"),
  name: z.string().min(1, "Name is required"),
  suppliers: z.string().min(1, "Supplier is required"),
  stock: z.string().regex(/^\d+$/, "Stock must be a number"),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  category: z.string().min(1, "Category is required"),
});

export type CreateProductData = z.infer<typeof productSchema>;

export const GetProductsQuerySchema = z.object({
  suppliers: z.string().optional(),
  name: z.string().optional(),
  stock: z.string().optional(),
  price: z.string().optional(),
  search: z.string().trim().optional(),
  sortBy: z.string().optional(),
  sortProduct: z.enum(["asc", "desc"]).optional().default("asc"),
});

export type GetProductsQuery = z.infer<typeof GetProductsQuerySchema>;
