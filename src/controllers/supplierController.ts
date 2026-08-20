import type { Request, Response } from "express";
import * as supplierService from "../services/supplierService.js";

export const getAllSuppliers = async (req: Request, res: Response) => {
  const suppliers = await supplierService.getAllSuppliers(req.query);
  res.json(suppliers);
};

export const getSupplierById = async (req: Request, res: Response) => {
  const { supplierId } = req.params;

  if (!supplierId || typeof supplierId !== "string") {
    return res.status(400).json({ message: "Invalid supplier ID" });
  }

  const supplier = await supplierService.getSupplierById(supplierId);

  if (!supplier) {
    return res.status(404).json({ message: "Supplier not found" });
  }

  res.json(supplier);
};

export const createSupplier = async (req: Request, res: Response) => {
  const newSupplier = await supplierService.createSupplier(req.body);
  res.status(201).json(newSupplier);
};

export const updateSupplier = async (req: Request, res: Response) => {
  const { supplierId } = req.params;

  if (!supplierId || typeof supplierId !== "string") {
    return res.status(400).json({ message: "Invalid supplier ID" });
  }

  const updatedSupplier = await supplierService.updateSupplier(
    supplierId,
    req.body,
  );

  if (!updatedSupplier) {
    return res.status(404).json({ message: "Supplier not found" });
  }

  res.json(updatedSupplier);
};

export const deleteSupplier = async (req: Request, res: Response) => {
  const { supplierId } = req.params;

  if (!supplierId || typeof supplierId !== "string") {
    return res.status(400).json({ message: "Invalid supplier ID" });
  }

  const deletedSupplier = await supplierService.deleteSupplier(supplierId);

  if (!deletedSupplier) {
    return res.status(404).json({ message: "Supplier not found" });
  }

  res.json({ message: "Supplier deleted successfully" });
};
