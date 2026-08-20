import { Schema, model, type InferSchemaType } from "mongoose";

const productSchema = new Schema(
  {
    id: { type: String, unique: true },
    name: { type: String, required: true, trim: true },
    photo: { type: String, required: true },
    suppliers: { type: String, required: true },
    stock: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true },
);

export type ProductDocument = InferSchemaType<typeof productSchema>;
export const Product = model("Product", productSchema);
