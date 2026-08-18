import { Schema, model, Types } from "mongoose";

export interface ISession {
  userId: Types.ObjectId;
  refreshToken: string;
  refreshTokenValidUntil: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    refreshToken: {
      type: String,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Session = model<ISession>("Session", sessionSchema);
