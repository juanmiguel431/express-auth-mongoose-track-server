import 'dotenv/config'
import './models/User';
import './apis/mongooseDbClient';
import express, { Request, Response } from 'express';
import authRoutes from './routes/auth';
import { authMiddleware } from './middlewares';

const app = express();

app.use(express.json());
app.use(authRoutes);

app.get('/', [authMiddleware], (req: Request, res: Response) => {
  // @ts-ignore
  res.send(`Your email is ${req.user?.email}`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
