import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import User from "../../models/userModel.js";
import { Session } from "../../models/sessionModel.js";
import {
  FIFTEEN_MINUTES,
  TWO_WEEKS,
} from "../../constants/cookiesSesionLife.js";

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+passwordHash");

  if (!user) {
    throw createHttpError(401, "Invalid email or password");
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    throw createHttpError(401, "Invalid email or password");
  }

  const accessSecret = process.env.JWT_SECRET;
  const refreshSecret = process.env.JWT_REFRESH_SECRET;

  if (!accessSecret || !refreshSecret) {
    throw createHttpError(500, "JWT secrets are not configured");
  }

  const accessToken = jwt.sign(
    {
      id: user._id.toString(),
      role: user.role,
    },
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
    refreshTokenValidUntil: new Date(Date.now() + Number(TWO_WEEKS)),
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
