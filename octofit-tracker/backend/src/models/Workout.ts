import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  exercises: {
    name: string;
    sets: number;
    reps: number;
    duration?: number;
  }[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number;
  targetMuscles: string[];
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    exercises: [
      {
        name: String,
        sets: Number,
        reps: Number,
        duration: Number,
      },
    ],
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    estimatedDuration: {
      type: Number,
      required: true,
    },
    targetMuscles: [String],
  },
  { timestamps: true }
);

export default mongoose.model<IWorkout>('Workout', workoutSchema);
