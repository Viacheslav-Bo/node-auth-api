import type { ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";
import { Error as MongooseError } from "mongoose";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const isDev = process.env.NODE_ENV === "development";

  if (isHttpError(err)) {
    res.status(err.status).json({
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    });
    return;
  }

  if (err instanceof MongooseError.CastError) {
    res.status(400).json({ message: `Invalid ${err.path}: ${err.value}` });
    return;
  }

  if (err instanceof MongooseError.ValidationError) {
    res.status(400).json({ message: err.message });
    return;
  }

  if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    err.code === 11000
  ) {
    res.status(409).json({ message: "Email already in use" });
    return;
  }

  if (err instanceof Error && err.name === "JsonWebTokenError") {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  if (err instanceof Error && err.name === "TokenExpiredError") {
    res.status(401).json({ message: "Token expired" });
    return;
  }

  console.error(err);
  res.status(500).json({
    message: "Internal server error",
    ...(isDev && err instanceof Error && { stack: err.stack }),
  });
};
