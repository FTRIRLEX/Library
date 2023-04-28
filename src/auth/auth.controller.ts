import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';

export class AuthController {
  static signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password, email } = req.body;
      const user = await authService.signUp(email, password, username);

      res.status(201).json({
        message: 'User has been created',
        user,
      });
    } catch (error) {
      next(error);
    }
  };
  static login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      const user = await authService.login(email, password);

      res.status(202).json({
        message: 'Login success',
        user,
      });
    } catch (error) {
      next(error);
    }
  };
}

