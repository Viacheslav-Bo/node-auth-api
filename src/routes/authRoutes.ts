import { Router } from "express";
import { signupController } from "../controllers/authControllers/signupController.js";
import { loginController } from "../controllers/authControllers/loginController.js";
import { logoutController } from "../controllers/authControllers/logoutController.js";
import { validateBody } from "../middlewares/validateBody.js";
import { signupSchema, loginSchema } from "../validation/authSchemas.js";
import { authenticate } from "../middlewares/authenticate.js";
import { refreshController } from "../controllers/authControllers/refreshController.js";
import { getUserInfoController } from "../controllers/authControllers/getUserInfoController.js";

const router = Router();

router.get("/user/user-info", authenticate, getUserInfoController);
router.post("/user/signup", validateBody(signupSchema), signupController);
router.post("/user/login", validateBody(loginSchema), loginController);
router.get("/user/logout", authenticate, logoutController);
router.post("/user/refresh", refreshController);

export default router;
