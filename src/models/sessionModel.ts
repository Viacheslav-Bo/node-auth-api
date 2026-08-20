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
      unique: true,
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

// TTL-індекс: MongoDB сама видалить документ, коли настане час `refreshTokenValidUntil`
sessionSchema.index({ refreshTokenValidUntil: 1 }, { expireAfterSeconds: 0 });

export const Session = model<ISession>("Session", sessionSchema);
