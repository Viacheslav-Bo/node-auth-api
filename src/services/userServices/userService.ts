import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import User from "../../models/userModel.js";
import { HASH_ROUNDS } from "../../constants/hashRounds.js";
import type {
  UpdateUserData,
  CreateUserData,
} from "../../validation/userSchemas.js";

export const getAllUsers = async () => {
  return User.find();
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw createHttpError(404, "User not found");
  }
  return user;
};

export const createUser = async (data: CreateUserData) => {
  const { name, email, password, role } = data;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, "Email already in use");
  }

  const passwordHash = await bcrypt.hash(password, HASH_ROUNDS);

  return User.create({ name, email, passwordHash, role });
};

export const updateUser = async (id: string, data: UpdateUserData) => {
  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw createHttpError(404, "User not found");
  }
  return user;
};

export const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw createHttpError(404, "User not found");
  }
  return user;
};
