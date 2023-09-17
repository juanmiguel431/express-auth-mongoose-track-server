import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from '../models';
import userSchema from '../mongoose/userSchema';

export const requireAuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
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

    req.user = await userSchema.findById(userId);

    next();
  });
};

export default requireAuthMiddleware;
