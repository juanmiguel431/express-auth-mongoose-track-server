import { IUser } from './models';

declare global {
  namespace Express {
    interface Request {
      user?: IUser | null;
    }
  }
}
