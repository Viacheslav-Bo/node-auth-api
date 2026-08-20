import { Router } from "express";
import {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplierController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { validateBody } from "../middlewares/validateBody.js";
import { supplierSchema } from "../validation/supplierSchemas.js";

const router = Router();
router.use(authenticate);
router.use(authorize("admin"));

router.get("/suppliers", getAllSuppliers);
router.get("/suppliers/:supplierId", getSupplierById);
router.post("/suppliers", validateBody(supplierSchema), createSupplier);
router.put(
  "/suppliers/:supplierId",
  validateBody(supplierSchema.partial()),
  updateSupplier,
);
router.delete("/suppliers/:supplierId", deleteSupplier);

export default router;
