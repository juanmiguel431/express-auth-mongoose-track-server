import express, { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import mongoose from 'mongoose';
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

    res.send('You made a post request');
  } catch (e) {
    if (e instanceof Error) {
      return res.status(422).send(e.message);
    }
  }
});

export default router;
