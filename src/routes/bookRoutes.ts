import { Router } from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookControllers/bookController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  createBookSchema,
  updateBookSchema,
} from "../validation/bookSchemas.js";

const router = Router();

router.get("/books", authenticate, getAllBooks);

router.get("/books/:id", authenticate, getBookById);

router.post(
  "/books",
  authenticate,
  authorize("admin"),
  validateBody(createBookSchema),
  createBook,
);

router.patch(
  "/books/:id",
  authenticate,
  authorize("admin"),
  validateBody(updateBookSchema),
  updateBook,
);

router.delete("/books/:id", authenticate, authorize("admin"), deleteBook);

export default router;
