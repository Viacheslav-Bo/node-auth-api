import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";
import { HASH_ROUNDS } from "../../constants/hashRounds.js";
import { Session } from "../../models/sessionModel.js";
import {
  FIFTEEN_MINUTES,
  TWO_WEEKS,
} from "../../constants/cookiesSesionLife.js";

export const signup = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createHttpError(409, "Email already in use");
  }

  const passwordHash = await bcrypt.hash(password, HASH_ROUNDS);

  const user = await User.create({
    name,
    email,
    passwordHash,
  });

  const accessSecret = process.env.JWT_SECRET;
  const refreshSecret = process.env.JWT_REFRESH_SECRET;

  if (!accessSecret || !refreshSecret) {
    throw createHttpError(500, "JWT secrets are not configured");
  }

  const accessToken = jwt.sign(
    { id: user._id.toString(), role: user.role },
    accessSecret,
    {
      expiresIn: (process.env.JWT_EXPIRES_IN ??
        FIFTEEN_MINUTES) as jwt.SignOptions["expiresIn"],
    },
  );

  const refreshToken = jwt.sign({ id: user._id.toString() }, refreshSecret, {
    expiresIn: TWO_WEEKS,
  } as jwt.SignOptions);

  const session = await Session.create({
    userId: user._id,
    refreshToken,
    refreshTokenValidUntil: new Date(Date.now() + TWO_WEEKS),
  });

  return {
    session: {
      _id: session._id,
      accessToken,
      refreshToken,
    },
    user,
  };
};
