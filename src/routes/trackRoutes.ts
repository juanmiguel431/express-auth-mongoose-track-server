import express, { Request, Response } from 'express';
import { trackSchema } from '../mongoose';
import { requireAuthMiddleware } from '../middlewares';
import { IUser } from '../models';

const router = express.Router();
router.use(requireAuthMiddleware);

interface AuthRequest extends Request{
  user?: IUser | null;
}

router.get('/tracks', async (req: AuthRequest, res: Response) => {
  const tracks = await trackSchema.find({ userId: req.user?._id });

  res.send(tracks);
});

export default router;
