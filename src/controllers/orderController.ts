import type { Request, Response } from "express";
import * as orderService from "../services/orderService.js";
import { getOrdersQuerySchema } from "../validation/orderSchemas.js";

export const getAllOrders = async (req: Request, res: Response) => {
  const validationResult = getOrdersQuerySchema.safeParse(req.query);

  if (!validationResult.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: validationResult.error.issues,
    });
  }

  const orders = await orderService.getAllOrders(validationResult.data);
  res.json(orders);
};
