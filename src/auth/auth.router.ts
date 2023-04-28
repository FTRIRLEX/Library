import * as express from 'express';
import { Application } from 'express';

import { validatePayload } from '@middleware';
import { AuthController } from './auth.controller';
import * as validate from './auth.validation';

const router = express.Router();

router.post('/signup', validate.signup, validatePayload, AuthController.signup);
router.post('/login', validate.login, validatePayload, AuthController.login);

export function mountRouter(app: Application): void {
  app.use('/auth', router);
}
