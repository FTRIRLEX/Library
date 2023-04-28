import { Request, Response, NextFunction } from 'express';
import { borrowingService } from './borrowing.service';

export class BorrowingController {
  static getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { offset, limit, sort, filter } = req.query;
      const borrowings = await borrowingService.all();
      res.status(200).json({ borrowings, totalItems: borrowings.length });
    } catch (error) {
      next(error);
    }
  };
  static getMyBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const borrowings = await borrowingService.getMyBooks(Number(userId));
      res.status(200).json({ borrowings, totalItems: borrowings.length });
    } catch (error) {
      next(error);
    }
  };
  static borrowBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, bookId } = req.body;
      await borrowingService.borrowBook(userId, bookId);
      res.status(200).json({
        message: 'Borrow was created',
      });
    } catch (error) {
      next(error);
    }
  };
  static returnBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const borrowingId = req.body.borrowingId;
      await borrowingService.returnBook(borrowingId);
      res.status(200).json({
        message: 'Borrow was achived',
      });
    } catch (error) {
      next(error);
    }
  };
}
