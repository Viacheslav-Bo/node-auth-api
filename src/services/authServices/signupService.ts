import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import User from "../../models/userModel.js";
import { HASH_ROUNDS } from "../../constants/hashRounds.js";

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

  return user;
};
