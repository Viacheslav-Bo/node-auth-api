import { Product } from "../models/productModel.js";
import { Supplier } from "../models/supplierModel.js";
import { Customer } from "../models/customerModel.js";

export const getDashboardData = async () => {
  const totalProducts = await Product.countDocuments();
  const totalSuppliers = await Supplier.countDocuments();
  const totalCustomers = await Customer.countDocuments();

  const recentCustomers = await Customer.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  const transactions: any[] = [];

  return {
    stats: {
      products: totalProducts,
      suppliers: totalSuppliers,
      customers: totalCustomers,
    },
    recentCustomers,
    transactions,
  };
};
