import { Request, Response, NextFunction } from 'express';
import { AppError } from '@errors';
import { bookService } from './book.service';

export class BookController {
  static getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const books = await bookService.getAll();
      res.status(200).json({ books, totalItems: books.length });
    } catch (error) {
      next(error);
    }
  };
  static getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const book = await bookService.getById(Number(id));
      res.status(200).json({
        book,
      });
    } catch (error) {
      next(error);
    }
  };
  static createBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { title, genre, author, description } = req.body;
      await bookService.addBook(title, genre, author, description);
      res.status(200).json({
        message: 'Book was created',
      });
    } catch (error) {
      next(error);
    }
  };
  static editBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const updatedPost = await bookService.update(Number(req.params.id), req.body);
      if (!updatedPost) {
        throw new AppError('Couldn\'t find book', 404);
      }
      res.status(200).json({
        message: 'The book has been updated.',
        book: updatedPost,
      });
    } catch (error) {
      next(error);
    }
  };
  static deleteBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = await bookService.delete(Number(req.params.id));
      if (id === null) {
        throw new AppError('Couldn\'t find post', 404);
      }
      res.status(200).json({
        message: 'The book has been deleted.',
        id,
      });
    } catch (error) {
      next(error);
    }
  };
}
