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
  const {
    name,
    category,
    suppliers,
    stock,
    price,
    search,
    sortBy,
    sortProduct,
  } = query;

  const filter: ProductFilter = {};

  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }
  if (category) filter.category = category;
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
  let productId = data.id;
  if (!productId) {
    const result = await Product.aggregate([
      { $addFields: { numericId: { $toInt: "$id" } } },
      { $sort: { numericId: -1 } },
      { $limit: 1 },
    ]);

    const lastId = result.length > 0 ? Number(result[0].id) : 0;
    productId = String(isNaN(lastId) ? 1 : lastId + 1);
  }

  return await Product.create({ ...data, id: productId });
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
