import type { Request, Response } from "express";
import * as userService from "../../services/userServices/userService.js";
import createHttpError from "http-errors";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;
  if (!id) {
    throw createHttpError(400, "User id is required");
  }
  const user = await userService.getUserById(id);
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;
  if (!id) {
    throw createHttpError(400, "User id is required");
  }
  const user = await userService.updateUser(id, req.body);
  res.json(user);
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;
  if (!id) {
    throw createHttpError(400, "User id is required");
  }
  const user = await userService.deleteUser(id);
  res.json(user);
};
