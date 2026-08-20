import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return next(createHttpError(401, "Authorization invalid"));
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return next(createHttpError(500, "JWT secret is not configured"));
  }

  try {
    const payload = jwt.verify(token, secret) as {
      id: string;
      role: "user" | "admin";
    };
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (err) {
    next(createHttpError(401, "Invalid or expired access token"));
  }
};
