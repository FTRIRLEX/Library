import { checkSchema } from 'express-validator';
import * as VALIDATION_SCHEMAS from 'users/constants/validations.constants';

export const unban = checkSchema({
  id: VALIDATION_SCHEMAS.BAN_ID,
});

export const leaderboard = checkSchema({
  sort: VALIDATION_SCHEMAS.SORT,
});
