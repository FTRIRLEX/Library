import { ParamSchema } from 'express-validator';

export const EMAIL: ParamSchema = {
  in: 'body',
  exists: { errorMessage: 'Email is requied' },
};

export const USERNAME: ParamSchema = {
  in: 'body',
  isString: {
    errorMessage: 'Username must be a string',
  },
  isLength: {
    errorMessage: 'Username must be at least 1 and less that 255 characters long',
    options: {
      min: 1,
      max: 255,
    },
  },
};

export const SIGNUP_PASSWORD: ParamSchema = {
  in: 'body',
  isLength: {
    errorMessage: 'Password must be at least 7 chars long',
    options: {
      min: 7,
    },
  },
};

export const LOGIN_PASSWORD: ParamSchema = {
  in: 'body',
  isString: {
    errorMessage: 'Password must be a String',
  },
};
