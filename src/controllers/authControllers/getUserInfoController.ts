import type { Request, Response } from "express";
import { getUserInfo } from "../../services/authServices/getUserInfoService.js";
import createHttpError from "http-errors";

export const getUserInfoController = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw createHttpError(401, "Unauthorized");
  }

  const userInfo = await getUserInfo(userId);

  res.status(200).json({
    status: 200,
    message: "Successfully retrieved user info",
    data: userInfo,
  });
};
