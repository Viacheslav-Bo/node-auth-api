import type { Request, Response } from "express";
import * as loginService from "../../services/authServices/loginService.js";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { token, user } = await loginService.login(email, password);

  res.status(200).json({ token, user });
};
