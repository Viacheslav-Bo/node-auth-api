import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { Session } from "../../models/sessionModel.js";
import User from "../../models/userModel.js";
import { TWO_WEEKS } from "../../constants/cookiesSesionLife.js";
import { createAuthTokens } from "../../helpers/authHelpers.js";

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

  if (!refreshSecret) {
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

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    createAuthTokens(user);

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
