import { Router, Request, Response } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find().populate('suggestedFor');
  res.json(workouts);
});

router.get('/:id', async (req: Request, res: Response) => {
  const workout = await Workout.findById(req.params.id).populate('suggestedFor');
  if (!workout) return res.status(404).json({ message: 'Workout not found' });
  res.json(workout);
});

router.post('/', async (req: Request, res: Response) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

router.put('/:id', async (req: Request, res: Response) => {
  const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!workout) return res.status(404).json({ message: 'Workout not found' });
  res.json(workout);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const workout = await Workout.findByIdAndDelete(req.params.id);
  if (!workout) return res.status(404).json({ message: 'Workout not found' });
  res.status(204).send();
});

export default router;
