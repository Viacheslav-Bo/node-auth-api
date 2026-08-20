import { Router } from "express";
import { getDashboardData } from "../controllers/dashboardController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";

const router = Router();

router.use(authenticate);
router.use(authorize("admin"));

router.get("/dashboard", getDashboardData);

export default router;
