import { Model, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../models';
import DbSchema from './dbSchema';

interface IUserInstanceMethods {
  comparePassword(candidatePassword: string): Promise<boolean | Error>;
}

interface IStaticMethods {}

type UserModel = Model<IUser, {}, IUserInstanceMethods> & IStaticMethods;

const schema = new Schema<IUser, UserModel>({
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
);

schema.pre('save', function (next, opts) {
  const user = this;
  if (!user.isModified('password')) {
    next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      next(err);
    }

    bcrypt.hash(user.password, salt, (err, encrypted) => {
      if (err) {
        next(err);
      }

      user.password = encrypted;
      next();
    });
  });
});

schema.method('comparePassword', function comparePassword(candidatePassword: string) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, same) => {
      if (err) {
        reject(err);
      }

      if (!same) {
        reject(false);
      }

      resolve(true);
    });
  });
});

const userSchema = model<IUser, UserModel>(DbSchema.User, schema);

export default userSchema;
