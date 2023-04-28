import { checkSchema } from 'express-validator';
import * as VALIDATION_SCHEMAS from './constants/validation.constants';

export const signup = checkSchema({
  email: VALIDATION_SCHEMAS.EMAIL,
  password: VALIDATION_SCHEMAS.SIGNUP_PASSWORD,
  username: VALIDATION_SCHEMAS.USERNAME,

});
export const login = checkSchema({
  email: VALIDATION_SCHEMAS.EMAIL,
  password: VALIDATION_SCHEMAS.LOGIN_PASSWORD,
});
