import { ParamSchema } from 'express-validator';

export const ID: ParamSchema = {
  in: 'body',
  isInt: {
    errorMessage: 'Id must be an integer',
  },
  toInt: true,
};

export const BAN_ID: ParamSchema = {
  in: 'params',
  isInt: {
    errorMessage: 'ID must be an Integer',
  },
};

export const SORT: ParamSchema = {
  in: 'query',
  optional: true,
  custom: {
    options: (value) => {
      if (Array.isArray(value) || typeof(value) !== 'object') {
        throw new Error('Sort must be Object');
      }
      if (!['desc', 'asc'].includes(value.type)) {
        throw new Error('Unknown sort type');
      }
      if (!['rating', 'username'].includes(value.field)) {
        throw new Error('Unkown sort field');
      }
      return true;
    },
  },
};
