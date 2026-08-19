import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { getAllOrders } from "../controllers/orderController.js";

const router = Router();

router.get("/orders", authenticate, getAllOrders);

export default router;
