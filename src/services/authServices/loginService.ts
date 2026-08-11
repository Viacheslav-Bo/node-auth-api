import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import User from "../../models/userModel.js";

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+passwordHash");

  if (!user) {
    throw createHttpError(401, "Invalid email or password");
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    throw createHttpError(401, "Invalid email or password");
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw createHttpError(500, "JWT secret is not configured");
  }

  const token = jwt.sign(
    {
      id: user._id.toString(),
      role: user.role,
    },
    secret,
    {
      expiresIn: (process.env.JWT_EXPIRES_IN ??
        "7d") as jwt.SignOptions["expiresIn"],
    },
  );

  return {
    token,
    user,
  };
};
