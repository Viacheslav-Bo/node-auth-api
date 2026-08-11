import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      createHttpError(401, "Authorization header missing or invalid"),
    );
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(createHttpError(401, "Access token is missing"));
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
    next(err);
  }
};
