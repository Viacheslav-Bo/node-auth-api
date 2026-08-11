import { Router } from "express";
import { signupController } from "../controllers/authControllers/signupController.js";
import { loginController } from "../controllers/authControllers/loginController.js";
import { validateBody } from "../middlewares/validateBody.js";
import { signupSchema, loginSchema } from "../validation/authSchemas.js";

const router = Router();

router.post("/signup", validateBody(signupSchema), signupController);
router.post("/login", validateBody(loginSchema), loginController);

export default router;
