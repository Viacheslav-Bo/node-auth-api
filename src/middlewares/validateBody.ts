import type { RequestHandler } from "express";
import type { ZodType } from "zod";
import createHttpError from "http-errors";

export const validateBody = (schema: ZodType): RequestHandler => {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = Object.fromEntries(
        result.error.issues.map((issue) => [
          issue.path.join("."),
          issue.message,
        ]),
      );

      return next(createHttpError(400, "Validation failed", { errors }));
    }

    req.body = result.data;
    next();
  };
};
