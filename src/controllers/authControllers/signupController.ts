import type { Request, Response } from "express";
import * as signupService from "../../services/authServices/signupService.js";

export const signupController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await signupService.signup(name, email, password);

  res.status(201).json({ user });
};
