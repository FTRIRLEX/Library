import * as express from 'express';
import { Application } from 'express';

import { validatePayload } from '@middleware';
import * as validate from './book.validation';
import { BookController } from './book.controller';

const router = express.Router();

router.get('/all', validate.getAll, validatePayload, BookController.getAll);
router.get('/:id', validate.getById, validatePayload, BookController.getById);
router.post('/', validate.createBook, validatePayload, BookController.createBook);
router.patch('/:id', validate.editBook, validatePayload, BookController.editBook);
router.delete('/:id', validate.deleteBook, validatePayload, BookController.deleteBook);

export function mountRouter(app: Application) {
  app.use('/book', router);
}
