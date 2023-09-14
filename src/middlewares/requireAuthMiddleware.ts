import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';

const User = mongoose.model('User');

export const requireAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  // authorization === 'Bearer afsfafdsafasfasdfas'

  if (!authorization) {
    return res.status(401).send({ error: 'Your must be logged in!' });
  }

  const jwtKey = process.env.JWT_SECRET_KEY;

  if (!jwtKey) {
    return res.status(500).send('Internal Server Error');
  }

  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, jwtKey, async (error, decoded) => {
    if (error) {
      return res.status(401).send({ error: 'Your must be logged in!' });
    }

    const { userId } = decoded as any;

    // @ts-ignore
    req.user = await User.findById(userId);

    next();
  });
};

export default requireAuthMiddleware;
