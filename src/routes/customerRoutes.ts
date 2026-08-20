import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import {
  getAllCustomers,
  getCustomerById,
} from "../controllers/customerController.js";

const router = Router();
router.use(authenticate);
router.use(authorize("admin"));

router.get("/customers", authenticate, getAllCustomers);
router.get("/customers/:customerId", authenticate, getCustomerById);

export default router;
