import { Book } from 'lib/entities/book.entity';
import { AppError } from '@errors';
import bookRepository from './book.repository';

class BookService {
  async addBook(title: string, genre: string, author: string, description: string): Promise<Book> {
    const book = bookRepository.create(title, genre, author, description);
    return book;
  }
  async update(id: number, props: Partial<Book>): Promise<Book | null> {
    return bookRepository.update(id, props);
  }

  async getById(id: number):Promise<Book | null> {
    const book = bookRepository.findById(id);
    const findByIdError = new AppError('Book not find', 404);
    if (book === null) {
      throw findByIdError;
    }
    return book;
  }

  async delete(id: number): Promise<void | null> {
    return bookRepository.delete(id);
  }

  async getAll(): Promise<Book[]> {
    return bookRepository.findAll();
  }
}

export const bookService = new BookService;
