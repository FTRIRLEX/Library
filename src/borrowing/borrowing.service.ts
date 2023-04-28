import { Borrowing } from 'lib/entities/borrowing.entity';
import { AppError } from '@errors';
import borrowingRepository from './borrowing.repository';
import { returnBook } from './borrowing.validation';

class BorrowingService {
  async borrowBook(userId: number, bookId: number): Promise<Borrowing> {
    const borrowing = borrowingRepository.create(userId, bookId);
    return borrowing;
  }

  async all(): Promise<Borrowing[]> {
    return borrowingRepository.getAll();
  }

  async getMyBooks(userId: number): Promise<Borrowing[]> {
    return borrowingRepository.getMyBooks(userId);
  }

  async returnBook(bookId : number): Promise<Borrowing | null> {
    return borrowingRepository.returnBook(bookId);
  }
}
export const borrowingService = new BorrowingService();
