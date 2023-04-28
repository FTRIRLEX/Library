import { checkSchema } from 'express-validator';
import * as VALIDATION_SCHEMAS from './constants/validation.constants';

export const borrowBook = checkSchema({
  bookId: VALIDATION_SCHEMAS.BOOK_ID,
  userId: VALIDATION_SCHEMAS.BOOK_ID,
  // days: VALIDATION_SCHEMAS.DAYS,
});
export const returnBook = checkSchema({
  borrowingId: VALIDATION_SCHEMAS.BORROWING_ID,
});

export const getMyBooks = checkSchema({
  userId: VALIDATION_SCHEMAS.BOOK_ID,
});
