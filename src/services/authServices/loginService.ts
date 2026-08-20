import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import User from "../../models/userModel.js";
import { createAuthSession } from "../../helpers/authHelpers.js";

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+passwordHash");

  if (!user) {
    throw createHttpError(401, "Invalid email or password");
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    throw createHttpError(401, "Invalid email or password");
  }

  const session = await createAuthSession(user);

  return {
    session,
    user,
  };
};
