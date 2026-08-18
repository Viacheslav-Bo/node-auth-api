import type { Request, Response } from "express";
import * as loginService from "../../services/authServices/loginService.js";
import { setSessionCookies } from "../../utils/setSessionCookies.js";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { session, user } = await loginService.login(email, password);

  setSessionCookies(res, session);

  res.status(200).json({
    status: 200,
    message: "Successfully logged in",
    data: {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    },
  });
};
