import createHttpError from "http-errors";
import Book from "../../models/bookModel.js";
import type {
  CreateBookData,
  UpdateBookData,
} from "../../validation/bookSchemas.js";

export const getAllBooks = async () => {
  return Book.find();
};

export const getBookById = async (id: string) => {
  const book = await Book.findById(id);
  if (!book) {
    throw createHttpError(404, "Book not found");
  }
  return book;
};

export const createBook = async (data: CreateBookData) => {
  return Book.create(data);
};

export const updateBook = async (id: string, data: UpdateBookData) => {
  const book = await Book.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!book) {
    throw createHttpError(404, "Book not found");
  }
  return book;
};

export const deleteBook = async (id: string) => {
  const book = await Book.findByIdAndDelete(id);
  if (!book) {
    throw createHttpError(404, "Book not found");
  }
  return book;
};
