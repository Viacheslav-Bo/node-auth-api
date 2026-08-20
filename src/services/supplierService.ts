import { Supplier } from "../models/supplierModel.js";
import type { CreateSupplierData } from "../validation/supplierSchemas.js";

export const getAllSuppliers = async (query: { name?: string }) => {
  const filter: any = {};
  if (query.name) {
    filter.name = { $regex: query.name, $options: "i" };
  }
  return await Supplier.find(filter).sort({ createdAt: -1 }).lean();
};

export const getSupplierById = async (id: string) => {
  return await Supplier.findById(id).lean();
};

export const createSupplier = async (data: CreateSupplierData) => {
  return await Supplier.create(data);
};

export const updateSupplier = async (
  id: string,
  data: Partial<CreateSupplierData>,
) => {
  return await Supplier.findByIdAndUpdate(id, data, { new: true }).lean();
};

export const deleteSupplier = async (id: string) => {
  return await Supplier.findByIdAndDelete(id).lean();
};
