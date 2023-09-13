import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function (next, opts) {
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

userSchema.methods.comparePassword = function (candidatePassword: string) {
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
};

mongoose.model('User', userSchema);
