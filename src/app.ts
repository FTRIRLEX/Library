import 'reflect-metadata';
import express from 'express';

import { mountRouter as mountAuthRouter } from 'auth/auth.router';
import { mountRouter as mountUserRouter } from 'users/user.router';
import { mountRouter as mountBookRouter } from 'books/book.router';
import { mountRouter as mountBorrowingRouter } from 'borrowing/borrowing.router';
import { logRequest, processError, processNotFoundEndpoint } from '@middleware';

import { AppDataSource } from 'database';
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use(logRequest);

mountAuthRouter(app);
mountUserRouter(app);
mountBookRouter(app);
mountBorrowingRouter(app);

app.use(processNotFoundEndpoint);
app.use(processError);

AppDataSource.initialize()
  .then(() => {
    console.log('Database Connecion Succesfully');
  })
  .catch((err) => {
    console.log('Error Connection Databse', err);
  });

app.listen(8080, () => console.log('Listening 8080'));

// async function init(): Promise<void> {
//   try {
//     app.listen(8080, () => console.log('Listening 8080'));
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// }

// init();
