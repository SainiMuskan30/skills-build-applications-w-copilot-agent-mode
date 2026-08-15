import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  duration: number;
  calories: number;
  description?: string;
  date: Date;
  createdAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['running', 'cycling', 'swimming', 'strength', 'yoga', 'cardio', 'other'],
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    calories: {
      type: Number,
      required: true,
      min: 0,
    },
    description: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IActivity>('Activity', activitySchema);
