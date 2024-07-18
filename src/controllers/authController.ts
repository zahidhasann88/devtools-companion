import { Request, Response, NextFunction } from 'express';
import { register, login } from '../services/authService';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    const token = await register(username, email, password);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
