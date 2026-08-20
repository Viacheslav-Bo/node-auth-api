import type { Request, Response } from "express";
import * as productService from "../services/productService.js";
import { GetProductsQuerySchema } from "../validation/productSchemas.js";

export const getAllProducts = async (req: Request, res: Response) => {
  const validationResult = GetProductsQuerySchema.safeParse(req.query);

  if (!validationResult.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: validationResult.error.issues,
    });
  }

  const products = await productService.getAllProducts(validationResult.data);
  res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const newProduct = await productService.createProduct(req.body);
  res.status(201).json(newProduct);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  if (!productId || typeof productId !== "string") {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  const updatedProduct = await productService.updateProduct(
    productId,
    req.body,
  );

  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(updatedProduct);
};

export const getProductById = async (req: Request, res: Response) => {
  const { productId } = req.params;

  if (!productId || typeof productId !== "string") {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  const product = await productService.getProductById(productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  if (!productId || typeof productId !== "string") {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  const deletedProduct = await productService.deleteProduct(productId);

  if (!deletedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({ message: "Product deleted successfully" });
};
