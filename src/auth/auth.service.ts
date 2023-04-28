import * as bcrypt from 'bcrypt';

import { AppError } from '@errors';
import UsersRepository from 'users/user.repository';
import { User } from 'users/user.entity';

class AuthSevice {
  async signUp(email: string, password: string, username: string): Promise<User> {
    const conflict = await UsersRepository.findByEmail(email);

    if (conflict) {
      throw new AppError('Email taken', 422);
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await UsersRepository.create(email, hashedPassword, username);
    return user;
  }

  async login(email: string, password: string):Promise<User> {
    const user = await UsersRepository.findByEmail(email);
    const authError = new AppError('Authentification failed. Check your email/password.', 401);
    if (!user) {
      throw authError;
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw authError;
    }
    return user;
  }
}

export const authService = new AuthSevice;
