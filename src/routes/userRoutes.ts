import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userControllers/userController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validation/userSchemas.js";

const router = Router();

router.use(authenticate);
router.use(authorize("admin"));

router.get("/users", getAllUsers);

router.get("/users/:id", getUserById);

router.post("/users", validateBody(createUserSchema), createUser);

router.patch("/users/:id", validateBody(updateUserSchema), updateUser);

router.delete("/users/:id", deleteUser);

export default router;
