import { Schema, model, type InferSchemaType } from "mongoose";

const customerSchema = new Schema(
  {
    photo: { type: String },
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    spent: { type: Number, default: 0 },
    phone: { type: String },
    address: { type: String },
  },
  { timestamps: { createdAt: "register_date", updatedAt: false } },
);

export type CustomerDocument = InferSchemaType<typeof customerSchema>;
export const Customer = model("Customer", customerSchema);
