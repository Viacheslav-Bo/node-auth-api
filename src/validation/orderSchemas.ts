import { z } from "zod";

export const orderSchema = z.object({
  photo: z
    .string()
    .url("Invalid URL format for photo")
    .optional()
    .or(z.literal("")),
  name: z.string().min(2, "Name is too short"),
  address: z.string().min(5, "Address is too short"),

  products: z.string().regex(/^\d+$/, "Products count must be a number"),

  price: z
    .string()
    .regex(
      /^\d{1,3}(,\d{3})*(\.\d{2})?$/,
      "Invalid price format (e.g., 890.66)",
    ),

  status: z.enum(
    [
      "Pending",
      "Processing",
      "Completed",
      "Cancelled",
      "Confirmed",
      "Shipped",
      "Delivered",
    ],
    {
      message: "Invalid order status",
    },
  ),

  order_date: z.string().min(1, "Order date is required"),
});

export type CreateOrderData = z.infer<typeof orderSchema>;

export const getOrdersQuerySchema = z.object({
  status: z
    .enum([
      "Pending",
      "Processing",
      "Completed",
      "Cancelled",
      "Confirmed",
      "Shipped",
      "Delivered",
    ])
    .optional(),
  search: z.string().trim().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional().default("asc"),
});

export type GetOrdersQuery = z.infer<typeof getOrdersQuerySchema>;
