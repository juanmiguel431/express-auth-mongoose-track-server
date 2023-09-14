import { Model } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
}

interface IUserInstanceMethods {
  comparePassword(candidatePassword: string): Promise<boolean | Error>;
}

interface IStaticMethods {

}

export type UserModel = Model<IUser, {}, IUserInstanceMethods> & IStaticMethods;
