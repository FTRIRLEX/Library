import { ParamSchema } from 'express-validator';
import { BOOK_GENRE } from './genre.constants';

export const DESCRIPTION: ParamSchema = {
  in: 'body',
  isString: {
    errorMessage: 'Description name must be a String',
  },
  isLength: {
    options: {
      min: 1,
      max: 1024,
    },
    errorMessage: 'Description must be at least 1 and less than 1024 chars long',
  },
};

export const BOOK_TITLE: ParamSchema = {
  in: 'body',
  isString: {
    errorMessage: 'Title must be a String',
  },
  isLength: {
    options: {
      min: 1,
      max: 255,
    },
    errorMessage: 'Title must be at least 1 and less than 255 characters long',
  },
};

export const AUTHOR: ParamSchema = {
  in: 'body',
  isString: {
    errorMessage: 'Author name must be a String',
  },
  isLength: {
    options: {
      min: 1,
      max: 255,
    },
    errorMessage: 'Author must be at least 1 and less than 255 characters long',
  },
};

export const GENRE: ParamSchema = {
  in: 'body',
  custom: {
    options: (value) => {
      if (!Object.values(BOOK_GENRE).includes(value)) {
        throw new Error('Unkown Genre');
      }
      return true;
    },
  },
};

export const SORT: ParamSchema = {
  in: 'query',
  optional: true,
  custom: {
    options: (value) => {
      if (Array.isArray(value) || typeof(value) !== 'object') {
        throw new Error('Sort must be an Object');
      }
      if (!['desc', 'asc'].includes(value.type)) {
        throw new Error('Unknown sort type');
      }
      if (!['title', 'author'].includes(value.field)) {
        throw new Error('Unkown sort field');
      }
      return true;
    },
  },
};

export const FILTER: ParamSchema = {
  in: 'query',
  optional: true,
  custom: {
    options: (filter) => {
      if (Array.isArray(filter) || typeof filter !== 'object') {
        throw new Error('Filter must be an Object');
      }
      const keys = Object.keys(filter);
      if (!keys.some((key) => ['author', 'genre'].includes(key))) {
        throw new Error('Filter: invalid field');
      }
      if (filter.author && typeof(filter.author) !== 'string') {
        throw new Error('Filter: invalid author');
      }
      if (filter.genre && !Object.values(BOOK_GENRE).includes(filter.genre)) {
        throw new Error('Filter: invalid genre');
      }
      return true;
    },
  },
};

export const OFFSET: ParamSchema = {
  in: 'query',
  optional: true,
  isInt: {
    errorMessage: 'Offset must be an Integer',
  },
};

export const LIMIT: ParamSchema = {
  in: 'query',
  optional: true,
  isInt: {
    errorMessage: 'Limit must be an Integer',
  },
};

export const ID: ParamSchema = {
  in: 'params',
  isInt: {
    errorMessage: 'ID must be an Integer',
  },
};
