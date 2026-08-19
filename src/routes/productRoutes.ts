import { Router } from "express";

import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { validateBody } from "../middlewares/validateBody.js";

const router = Router();

router.get("/products", authenticate);
router.get("/products?", authenticate);
router.post("/products");
router.put("/products/:productId");
router.delete("/products/:productId");

export default router;
