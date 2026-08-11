import type { Request, Response } from "express";
import * as bookService from "../../services/bookServices/bookService.js";
import createHttpError from "http-errors";

export const getAllBooks = async (req: Request, res: Response) => {
  const books = await bookService.getAllBooks();
  res.json(books);
};

export const getBookById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;
  if (!id) {
    throw createHttpError(400, "Book id is required");
  }
  const book = await bookService.getBookById(id);
  res.json(book);
};

export const createBook = async (req: Request, res: Response) => {
  const book = await bookService.createBook(req.body);
  res.status(201).json(book);
};

export const updateBook = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;
  if (!id) {
    throw createHttpError(400, "Book id is required");
  }
  const book = await bookService.updateBook(id, req.body);
  res.json(book);
};

export const deleteBook = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;
  if (!id) {
    throw createHttpError(400, "Book id is required");
  }
  const book = await bookService.deleteBook(id);
  res.json(book);
};
