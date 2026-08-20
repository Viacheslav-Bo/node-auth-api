import createHttpError from "http-errors";
import { Customer } from "../models/customerModel.js";
import {
  parsePaginationParams,
  formatPaginatedResponse,
} from "../helpers/paginationHelper.js";

interface CustomerQuery {
  page?: string;
  limit?: string;
  name?: string;
}

export const getAllCustomers = async (query: CustomerQuery) => {
  const { page, limit, skip } = parsePaginationParams(query);

  const filter =
    query.name ? { name: { $regex: query.name, $options: "i" } } : {};

  const [customers, total] = await Promise.all([
    Customer.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean(),
    Customer.countDocuments(filter),
  ]);

  return formatPaginatedResponse(customers, total, page, limit);
};

export const getCustomerById = async (customerId: string) => {
  const customer = await Customer.findById(customerId).lean();

  if (!customer) {
    throw createHttpError(404, "Customer not found");
  }

  return customer;
};
