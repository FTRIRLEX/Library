import * as express from 'express';
import { Application } from 'express';

import { validatePayload } from '@middleware';
import * as validate from './user.validation';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/leaderboard', validate.leaderboard, validatePayload, UserController.leaderboard);
router.post('/unban/:id', validate.unban, validatePayload, UserController.unban);
router.post('/ban/:id', validate.unban, validatePayload, UserController.ban);

export function mountRouter(app: Application) {
  app.use('/user', router);
}

