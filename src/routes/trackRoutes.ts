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

router.post('/tracks', async (req: AuthRequest, res: Response) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    res.status(422).send({ error: 'You must provide a name and a location' });
  }

  try {
    const track = new trackSchema({ name, locations, userId: req.user?._id });
    await track.save();

    res.send(track);
  } catch (e) {
    if (e instanceof Error) {
      res.status(422).send({ error: e.message });
    }
  }
});

export default router;
