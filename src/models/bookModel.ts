import { Schema, model, type InferSchemaType } from "mongoose";

const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    pageCount: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true },
);

export type BookDocument = InferSchemaType<typeof bookSchema>;
export default model("Book", bookSchema);
