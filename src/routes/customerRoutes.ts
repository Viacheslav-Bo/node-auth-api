import { Router } from "express";

import { authenticate } from "../middlewares/authenticate.js";

import {
  getAllCustomers,
  getCustomerById,
} from "../controllers/customerController.js";

const router = Router();

router.get("/customers", authenticate, getAllCustomers);
router.get("/customers/:customerId", authenticate, getCustomerById);

export default router;
