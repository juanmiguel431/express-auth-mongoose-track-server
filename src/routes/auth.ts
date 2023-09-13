import express, { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
// import mongoDbClient from '../apis/mongoDbClient'; // Automatically connect to mongo Db using the native client.
// import MongoDbCollectionManager from '../apis/mongoDbCollectionManager'; //Manager that user the native client.
// import { OptionalId } from 'mongodb';
// import { User } from '../models';
// import { connection } from '../apis/mongooseDbClient';

const User = mongoose.model('User');

const router = express.Router();

interface SignupRequest {
  email: string;
  password: string;
}

router.post('/signup', async (req: Request<core.ParamsDictionary, any, SignupRequest>, res: Response) => {
  const { email, password } = req.body;

  // const userManager = new MongoDbCollectionManager<OptionalId<User>>(mongoDbClient, 'users');
  // await userManager.insert(req.body);

  try {
    const user = new User({ email, password });
    await user.save();

    const jwtKey = process.env.JWT_SECRET_KEY;

    if (!jwtKey) {
      return res.status(500).send('Internal Server Error');
    }

    const token = jwt.sign({ userId: user._id }, jwtKey, { expiresIn: '1h' });

    res.send({ token });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(422).send(e.message);
    }
  }
});

export default router;
