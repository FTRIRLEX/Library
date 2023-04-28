import { DataSource } from 'typeorm';
import { Book } from 'lib/entities/book.entity';
import { Borrowing } from 'lib/entities/borrowing.entity';
import { User } from 'lib/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '123',
  database: 'test',
  entities: [Borrowing, User, Book],
  logging: true,
  synchronize: true,
});
