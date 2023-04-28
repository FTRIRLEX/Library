import { Request, Response, NextFunction } from 'express';
import { AppError } from '@errors';
import { userService } from './user.service';

export class UserController {
  static leaderboard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await userService.leaderboard();
      res.status(200).json({ users, totalItems: users.length });
    } catch (error) {
      next(error);
    }
  };
  static ban = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const updatedUser = await userService.ban(Number(req.params.id));
      if (!updatedUser) {
        throw new AppError('Couldn\'t find book', 404);
      }
      res.status(200).json({
        message: 'User was banned.',
        user: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  };

  static unban = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const updatedUser = await userService.unban(Number(req.params.id));
      if (!updatedUser) {
        throw new AppError('Couldn\'t find book', 404);
      }
      res.status(200).json({
        message: 'User was banned.',
        user: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  };
}
