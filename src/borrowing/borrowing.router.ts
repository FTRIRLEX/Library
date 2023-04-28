import * as express from 'express';
import { Application } from 'express';

import { validatePayload } from '@middleware';
import * as validate from './borrowing.validation';
import { BorrowingController } from './borrowing.controller';

const router = express.Router();

router.get('/all', BorrowingController.getAll);
router.post('/', validate.borrowBook, validatePayload, BorrowingController.borrowBook);
router.post('/return', validate.returnBook, validatePayload, BorrowingController.returnBook);
router.get('/my/:id', BorrowingController.getMyBooks);

export function mountRouter(app: Application) {
  app.use('/borrowing', router);
}
