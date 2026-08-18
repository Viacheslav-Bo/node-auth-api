import type { Request, Response } from "express";
import { Session } from "../../models/sessionModel.js";

export const logoutController = async (req: Request, res: Response) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none" as const,
  };

  res.clearCookie("sessionId", cookieOptions);
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);

  res.status(204).send();
};
