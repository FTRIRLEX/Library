import { checkSchema } from 'express-validator';
import * as VALIDATION_SCHEMAS from 'books/constants/validation.constants';

export const getAll = checkSchema({
  offset: VALIDATION_SCHEMAS.OFFSET,
  limit: VALIDATION_SCHEMAS.LIMIT,
  sort: VALIDATION_SCHEMAS.SORT,
  filter: VALIDATION_SCHEMAS.FILTER,
});

export const getById = checkSchema({
  id: VALIDATION_SCHEMAS.ID,
});

export const createBook = checkSchema({
  title: VALIDATION_SCHEMAS.BOOK_TITLE,
  genre: VALIDATION_SCHEMAS.GENRE,
  author: VALIDATION_SCHEMAS.AUTHOR,
  description: VALIDATION_SCHEMAS.DESCRIPTION,
});

export const editBook = checkSchema({
  id: VALIDATION_SCHEMAS.ID,
  title: {
    ...VALIDATION_SCHEMAS.BOOK_TITLE,
    optional: true,
  },
  genre: {
    ...VALIDATION_SCHEMAS.GENRE,
    optional: true,
  },
  author: {
    ...VALIDATION_SCHEMAS.AUTHOR,
    optional: true,
  },
  description: {
    ...VALIDATION_SCHEMAS.DESCRIPTION,
    optional: true,
  },
});

export const deleteBook = checkSchema({
  id: VALIDATION_SCHEMAS.ID,
});
