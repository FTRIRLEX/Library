import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BORROWING_STATUS } from 'borrowing/constants/status.constants';
import Model from './model.entity';
import { User } from './user.entity';
import { Book } from './book.entity';

@Entity('borrowings')
export class Borrowing extends Model {
  @Column({
    nullable: true,
    default: null,
  })
    returnedAt: Date;

  // @Column()
  // userId: number;

  // @Column()
  // bookId: number;

  @Column({
    type: 'enum',
    enum: BORROWING_STATUS,
    default: BORROWING_STATUS.ACTIVE,
  })
    status: string;

}

