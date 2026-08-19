import type { Request, Response } from "express";
import * as customerService from "../services/customerService.js";
import createHttpError from "http-errors";

export const getAllCustomers = async (req: Request, res: Response) => {
  const customers = await customerService.getAllCustomers();
  res.json(customers);
};

export const getCustomerById = async (
  req: Request<{ customerId: string }>,
  res: Response,
) => {
  const { customerId } = req.params;
  if (!customerId) {
    throw createHttpError(400, "Customer id is required");
  }
  const customer = await customerService.getCustomerById(customerId);
  res.json(customer);
};
