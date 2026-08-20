import { Router } from "express";

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { validateBody } from "../middlewares/validateBody.js";
import { productSchema } from "../validation/productSchemas.js";

const router = Router();
router.use(authenticate);
router.use(authorize("admin"));

router.get("/products", getAllProducts);
router.get("/products/:productId", getProductById);
router.post("/products", validateBody(productSchema), createProduct);
router.put(
  "/products/:productId",
  validateBody(productSchema.partial()),
  updateProduct,
);
router.delete("/products/:productId", deleteProduct);

export default router;
