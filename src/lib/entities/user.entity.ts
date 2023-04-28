import { Column, Entity, OneToMany } from 'typeorm';
import { USER_ROLE } from 'users/constants/role.constants';
import Model from './model.entity';
import { Borrowing } from './borrowing.entity';

@Entity('users')
export class User extends Model {
  @Column()
    username: string;

  @Column({
    unique: true,
  })
    email: string;

  @Column()
    password: string;

  @Column({
    type: 'enum',
    enum: USER_ROLE,
    default: USER_ROLE.USER,
  })
    role: string;

  @Column({
    default: false,
  })
    isBanned: boolean;

  @Column({
    default: 10,
  })
    rating: number;

}
