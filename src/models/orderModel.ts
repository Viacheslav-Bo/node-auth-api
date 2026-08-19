import { Schema, model, type InferSchemaType } from "mongoose";

const orderSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    photo: { type: String },
    products: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed", "Cancelled"],
      default: "Pending",
    },
    order_date: { type: String, required: true },
  },
  { timestamps: true },
);

export type OrderDocument = InferSchemaType<typeof orderSchema>;
export const Order = model("Order", orderSchema);
