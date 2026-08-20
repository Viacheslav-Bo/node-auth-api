import { z } from "zod";

export const supplierSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  suppliers: z.string().min(1, "Supplier is required"),
  date: z.string().min(1, "Date is required"),
  amount: z.string().min(1, "Amount is required"),
  status: z.enum(["Active", "Deactive"], {
    message: "Status must be either 'Active' or 'Deactive'",
  }),
});

export type CreateSupplierData = z.infer<typeof supplierSchema>;
