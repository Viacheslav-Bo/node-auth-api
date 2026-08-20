import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";

import morgan from "morgan";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ status: "viach.dev" });
});
app.use(authRoutes);
app.use(customerRoutes);
app.use(orderRoutes);
app.use(productRoutes);
// app.use(supplierRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
