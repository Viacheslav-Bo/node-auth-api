import { Schema, model, type InferSchemaType } from "mongoose";

const productSchema = new Schema(
  {
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    photo: { type: String, required: true },
    suppliers: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true },
);

export type ProductDocument = InferSchemaType<typeof productSchema>;
export const Product = model("Product", productSchema);
