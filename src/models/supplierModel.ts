import { Schema, model, type InferSchemaType } from "mongoose";

const supplierSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    suppliers: { type: String, required: true },
    date: { type: String, required: true },
    amount: { type: String, required: true },
    status: { type: String, required: true, enum: ["Active", "Deactive"] },
  },
  { timestamps: true },
);

export type SupplierDocument = InferSchemaType<typeof supplierSchema>;
export const Supplier = model("Supplier", supplierSchema);
