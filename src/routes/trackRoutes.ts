import express, { Request, Response } from 'express';
import { trackSchema } from '../mongoose';
import { requireAuthMiddleware } from '../middlewares';

const router = express.Router();
router.use(requireAuthMiddleware);

router.post('/tracks', async (req: Request, res: Response) => {
  const tracks = await trackSchema.find({ userId: req.user?._id });

  res.send(tracks);
});

export default router;
