import { Request, Response } from 'express';
import { Workout } from '../models';

export const getWorkouts = async (req: Request, res: Response) => {
  try {
    const { difficulty } = req.query;
    const filter: any = difficulty ? { difficulty } : {};
    const workouts = await Workout.find(filter);
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
};

export const getWorkoutById = async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
};

export const createWorkout = async (req: Request, res: Response) => {
  try {
    const { name, description, exercises, difficulty, estimatedDuration, targetMuscles } =
      req.body;
    const newWorkout = new Workout({
      name,
      description,
      exercises,
      difficulty,
      estimatedDuration,
      targetMuscles,
    });
    await newWorkout.save();
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
};

export const updateWorkout = async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(workout);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update workout' });
  }
};

export const deleteWorkout = async (req: Request, res: Response) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.json({ message: 'Workout deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
};

export const getWorkoutsByDifficulty = async (req: Request, res: Response) => {
  try {
    const { difficulty } = req.params;
    const filter: any = { difficulty };
    const workouts = await Workout.find(filter);
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts by difficulty' });
  }
};
