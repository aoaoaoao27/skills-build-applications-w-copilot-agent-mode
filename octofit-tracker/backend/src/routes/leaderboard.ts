import { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const leaderboard = await Leaderboard.find().populate('team').sort({ points: -1 });
  res.json(leaderboard);
});

router.get('/:id', async (req: Request, res: Response) => {
  const entry = await Leaderboard.findById(req.params.id).populate('team');
  if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
  res.json(entry);
});

router.post('/', async (req: Request, res: Response) => {
  const entry = await Leaderboard.create(req.body);
  res.status(201).json(entry);
});

router.put('/:id', async (req: Request, res: Response) => {
  const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
  res.json(entry);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const entry = await Leaderboard.findByIdAndDelete(req.params.id);
  if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
  res.status(204).send();
});

export default router;
