import { User } from 'lib/entities/user.entity';
import { AppError } from '@errors';
import userRepository from './user.repository';

class UserService {
  async leaderboard():Promise<User[]> {
    const users = userRepository.findAll();
    const findByIdError = new AppError('User not find', 404);
    if (users === null) {
      throw findByIdError;
    }
    return users;
  }

  async ban(id: number): Promise<User | null> {
    return userRepository.ban(id);
  }

  async unban(id: number): Promise<User | null> {
    return userRepository.unban(id);
  }
}

export const userService = new UserService;
