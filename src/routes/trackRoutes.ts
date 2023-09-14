import express, { Request, Response } from 'express';
import { trackSchema } from '../mongoose';
import { requireAuthMiddleware } from '../middlewares';
import { AuthRequest } from '../models';

const router = express.Router();
router.use(requireAuthMiddleware);

router.get('/tracks', async (req: AuthRequest, res: Response) => {
  const tracks = await trackSchema.find({ userId: req.user?._id });

  res.send(tracks);
});

router.post('/tracks', (req, res) => {

});

export default router;
