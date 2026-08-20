import createHttpError from "http-errors";
import { Customer } from "../models/customerModel.js";

export const getAllCustomers = async () => {
  return Customer.find();
};

export const getCustomerById = async (customerId: string) => {
  const customer = await Customer.findById(customerId);
  if (!customer) {
    throw createHttpError(404, "Customer not found");
  }
  return customer;
};
