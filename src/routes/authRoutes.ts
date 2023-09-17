import express, { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import jwt from 'jsonwebtoken';
import { userSchema } from '../mongoose';
import { requireAuthMiddleware } from '../middlewares';
import { AuthRequest } from '../models';

const router = express.Router();

interface SignupRequest {
  email: string;
  password: string;
}

router.post('/signup', async (req: Request<core.ParamsDictionary, any, SignupRequest>, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = new userSchema({ email, password });
    await user.save();

    const jwtKey = process.env.JWT_SECRET_KEY;

    if (!jwtKey) {
      return res.status(500).send('Internal Server Error');
    }

    const token = jwt.sign({ userId: user._id }, jwtKey, { expiresIn: '10h' });

    res.send({ token });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(422).send(e.message);
    }
  }
});

router.get('/getUser', requireAuthMiddleware, (req: AuthRequest, res: Response) => {
  const user = req.user;
  res.send({ _id: user?._id, email: user?.email });
});

router.post('/signin', async (req: Request<core.ParamsDictionary, any, SignupRequest>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = await userSchema.findOne({ email: email });

  if (!user) {
    return res.status(401).send({ error: 'Invalid password or email' });
  }

  try {
    await user.comparePassword(password);


    const jwtKey = process.env.JWT_SECRET_KEY;

    if (!jwtKey) {
      return res.status(500).send('Internal Server Error');
    }

    const token = jwt.sign({ userId: user._id }, jwtKey, { expiresIn: '10h' });

    res.send({ token });

  } catch (e) {
    if (e instanceof Error) {
      return res.status(401).send({ error: 'Invalid password or email' });
    }
  }
})

export default router;
