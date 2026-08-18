import createHttpError from "http-errors";
import User from "../../models/userModel.js";

export const getUserInfo = async (userId: string) => {
  const user = await User.findById(userId).select("name email role");

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  return {
    name: user.name,
    email: user.email,
  };
};
