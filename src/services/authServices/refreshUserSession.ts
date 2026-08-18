import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { Session } from "../../models/sessionModel.js";
import User from "../../models/userModel.js";
import {
  FIFTEEN_MINUTES,
  TWO_WEEKS,
} from "../../constants/cookiesSesionLife.js";

export const refreshUserSession = async (
  sessionId: string,
  incomingRefreshToken: string,
) => {
  const session = await Session.findById(sessionId);
  if (!session) {
    throw createHttpError(401, "Session not found");
  }

  if (session.refreshToken !== incomingRefreshToken) {
    throw createHttpError(401, "Token mismatch");
  }

  if (new Date() > session.refreshTokenValidUntil) {
    await Session.deleteOne({ _id: session._id });
    throw createHttpError(401, "Refresh token expired");
  }

  const refreshSecret = process.env.JWT_REFRESH_SECRET;
  const accessSecret = process.env.JWT_SECRET;

  if (!refreshSecret || !accessSecret) {
    throw createHttpError(500, "JWT secrets are not configured");
  }

  let payload;
  try {
    payload = jwt.verify(incomingRefreshToken, refreshSecret) as { id: string };
  } catch (err) {
    throw createHttpError(401, "Invalid refresh token");
  }

  const user = await User.findById(payload.id);
  if (!user) {
    throw createHttpError(401, "User not found");
  }

  const newAccessToken = jwt.sign(
    { id: user._id.toString(), role: user.role },
    accessSecret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN ?? FIFTEEN_MINUTES,
    } as jwt.SignOptions,
  );

  const newRefreshToken = jwt.sign({ id: user._id.toString() }, refreshSecret, {
    expiresIn: TWO_WEEKS,
  } as jwt.SignOptions);

  await Session.findByIdAndUpdate(session._id, {
    refreshToken: newRefreshToken,
    refreshTokenValidUntil: new Date(Date.now() + TWO_WEEKS),
  });

  return {
    session: {
      _id: session._id,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    },
    user,
  };
};
