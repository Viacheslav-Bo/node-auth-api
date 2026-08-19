import { Order } from "../models/orderModel.js";
import type { GetOrdersQuery } from "../validation/orderSchemas.js";

interface OrderFilter {
  status?: GetOrdersQuery["status"];
  name?: {
    $regex: string;
    $options: string;
  };
}

export const getAllOrders = async (query: GetOrdersQuery) => {
  const { status, search, sortBy, sortOrder } = query;

  const filter: OrderFilter = {};

  if (status) {
    filter.status = status;
  }

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  const sortField = sortBy || "createdAt";
  const sortString = sortOrder === "desc" ? `-${sortField}` : sortField;

  return await Order.find(filter).sort(sortString).lean();
};
