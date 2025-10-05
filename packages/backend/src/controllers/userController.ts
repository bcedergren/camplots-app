import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  registerUser,
  loginUser,
  requestPasswordReset,
  resetPassword,
  getUserProfile,
} from '../services/userService';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res
      .status(201)
      .json({ userId: user.userId, message: 'Registration successful' });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { token, expiresIn } = await loginUser(req.body);
    res.status(200).json({ token, expiresIn });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your_jwt_secret'
    ) as { userId: string };

    const user = await getUserProfile(decoded.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const message = await requestPasswordReset(email);
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res
        .status(400)
        .json({ message: 'Token and password are required' });
    }
    const message = await resetPassword(token, password);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
