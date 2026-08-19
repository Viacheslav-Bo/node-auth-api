import { Router } from "express";

import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { validateBody } from "../middlewares/validateBody.js";

const router = Router();

router.get("/suppliers", authenticate);
router.post("/suppliers");
router.put("/suppliers/:supplierId");

export default router;
