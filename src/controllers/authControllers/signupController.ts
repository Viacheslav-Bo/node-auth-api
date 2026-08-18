import type { Request, Response } from "express";
import * as signupService from "../../services/authServices/signupService.js";
import { setSessionCookies } from "../../utils/setSessionCookies.js";

export const signupController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const { session, user } = await signupService.signup(name, email, password);

  setSessionCookies(res, session);

  res.status(201).json({
    status: 201,
    message: "Successfully registered",
    data: {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    },
  });
};
