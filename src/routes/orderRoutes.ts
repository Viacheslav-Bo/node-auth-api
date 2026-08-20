import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { getAllOrders } from "../controllers/orderController.js";

const router = Router();
router.use(authenticate);
router.use(authorize("admin"));

router.get("/orders", getAllOrders);

export default router;
