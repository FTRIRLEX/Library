import { Column, Entity, OneToMany } from 'typeorm';
import { BOOK_GENRE } from 'books/constants/genre.constants';
import Model from './model.entity';
import { Borrowing } from './borrowing.entity';

@Entity('books')
export class Book extends Model {
  @Column()
    title: string;

  @Column()
    description: string;

  @Column()
    author: string;

  @Column({
    type: 'enum',
    enum: BOOK_GENRE,
  })
    genre: string;

}
