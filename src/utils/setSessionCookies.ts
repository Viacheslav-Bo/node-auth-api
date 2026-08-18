import type { Response } from "express";
import { FIFTEEN_MINUTES, TWO_WEEKS } from "../constants/cookiesSesionLife.js";

export const setSessionCookies = (
  res: Response,
  session: { _id: any; accessToken: string; refreshToken: string },
) => {
  res.cookie("accessToken", session.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: FIFTEEN_MINUTES,
  });

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: TWO_WEEKS,
  });

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: TWO_WEEKS,
  });
};
