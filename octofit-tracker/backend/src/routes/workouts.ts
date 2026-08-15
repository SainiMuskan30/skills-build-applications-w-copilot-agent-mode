import express from 'express';
import {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkoutsByDifficulty,
} from '../controllers/workoutController';

const router = express.Router();

router.get('/', getWorkouts);
router.get('/difficulty/:difficulty', getWorkoutsByDifficulty);
router.get('/:id', getWorkoutById);
router.post('/', createWorkout);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

export default router;
