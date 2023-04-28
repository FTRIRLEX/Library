import { ParamSchema } from 'express-validator';

export const BOOK_ID: ParamSchema = {
  in: 'body',
  isInt: {
    errorMessage: 'Book ID must be Integer',
  },
  toInt: true,
};

export const DAYS: ParamSchema = {
  in: 'body',
  isInt: {
    errorMessage: 'Count of days must be Integer',
  },
  toInt: true,
};

export const BORROWING_ID: ParamSchema = {
  in: 'body',
  isInt: {
    errorMessage: 'Borrowing ID must be Integer',
  },
  toInt: true,
};
