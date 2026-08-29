import { Router, Request, Response } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const teams = await Team.find().populate('members');
  res.json(teams);
});

router.get('/:id', async (req: Request, res: Response) => {
  const team = await Team.findById(req.params.id).populate('members');
  if (!team) return res.status(404).json({ message: 'Team not found' });
  res.json(team);
});

router.post('/', async (req: Request, res: Response) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

router.put('/:id', async (req: Request, res: Response) => {
  const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!team) return res.status(404).json({ message: 'Team not found' });
  res.json(team);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const team = await Team.findByIdAndDelete(req.params.id);
  if (!team) return res.status(404).json({ message: 'Team not found' });
  res.status(204).send();
});

export default router;
