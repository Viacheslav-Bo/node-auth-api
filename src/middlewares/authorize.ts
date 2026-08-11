import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

export const authorize = (...allowedRoles: Array<"user" | "admin">) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(createHttpError(401, "Not authenticated"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(createHttpError(403, "Forbidden: insufficient permissions"));
    }

    next();
  };
};
