import { Product } from "../models/productModel.js";
import type {
  GetProductsQuery,
  CreateProductData,
} from "../validation/productSchemas.js";

interface ProductFilter {
  name?: {
    $regex: string;
    $options: string;
  };
  suppliers?: string;
  stock?: string;
  price?: string;
  category?: string;
}

export const getAllProducts = async (query: GetProductsQuery) => {
  const { name, suppliers, stock, price, search, sortBy, sortProduct } = query;

  const filter: ProductFilter = {};

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }
  if (suppliers) filter.suppliers = suppliers;
  if (stock) filter.stock = stock;
  if (price) filter.price = price;

  const sortField = sortBy || "createdAt";
  const sortString = sortProduct === "desc" ? `-${sortField}` : sortField;

  return await Product.find(filter).sort(sortString).lean();
};

export const getProductById = async (id: string) => {
  return await Product.findOne({ id }).lean();
};

export const createProduct = async (data: CreateProductData) => {
  return await Product.create(data);
};

export const updateProduct = async (
  id: string,
  data: Partial<CreateProductData>,
) => {
  return await Product.findOneAndUpdate({ id }, data, { new: true });
};

export const deleteProduct = async (id: string) => {
  return await Product.findOneAndDelete({ id });
};
