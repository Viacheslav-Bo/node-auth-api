import type { Request, Response } from "express";
import { refreshUserSession } from "../../services/authServices/refreshUserSession.js";
import { setSessionCookies } from "../../utils/setSessionCookies.js";
import createHttpError from "http-errors";

export const refreshController = async (req: Request, res: Response) => {
  const { sessionId, refreshToken } = req.cookies;

  if (!sessionId || !refreshToken) {
    throw createHttpError(
      401,
      "Session ID or Refresh Token is missing in cookies",
    );
  }

  const { session, user } = await refreshUserSession(sessionId, refreshToken);

  setSessionCookies(res, session);

  res.status(200).json({
    status: 200,
    message: "Successfully refreshed session",
    data: {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    },
  });
};
