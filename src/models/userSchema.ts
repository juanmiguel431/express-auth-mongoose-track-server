import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, UserModel } from './index';
import { mongooseModel } from './mongooseModels';

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

const User = model<IUser, UserModel>(mongooseModel.User, schema);

export default User;
