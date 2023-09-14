import 'dotenv/config'
import './apis/mongooseDbClient';
import express, { Request, Response } from 'express';
import { authRoutes, trackRoutes } from './routes';
import { requireAuthMiddleware } from './middlewares';

const app = express();

app.use(express.json());
app.use(authRoutes, trackRoutes);

app.get('/', [requireAuthMiddleware], (req: Request, res: Response) => {
  // @ts-ignore
  res.send(`Your email is ${req.user?.email}`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
