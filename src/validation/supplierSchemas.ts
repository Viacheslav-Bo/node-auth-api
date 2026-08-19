import { z } from "zod";

export const supplierSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  address: z.string().min(2, "Address is required"),
  suppliers: z.string().min(1, "Supplier is required"),
  date: z.string().min(1, "Date is required"),
  amount: z.number().positive("Amount must be positive"),
  status: z.enum(["Active", "Inactive", "Pending", "Completed"], {
    message: "Invalid status",
  }),
});

export type CreateSupplierData = z.infer<typeof supplierSchema>;
