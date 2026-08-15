import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  user: mongoose.Types.ObjectId;
  team?: mongoose.Types.ObjectId;
  totalCaloriesBurned: number;
  activitiesCount: number;
  averageDuration: number;
  rank: number;
  score: number;
  period: 'weekly' | 'monthly' | 'allTime';
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
    },
    totalCaloriesBurned: {
      type: Number,
      default: 0,
    },
    activitiesCount: {
      type: Number,
      default: 0,
    },
    averageDuration: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
    period: {
      type: String,
      enum: ['weekly', 'monthly', 'allTime'],
      default: 'allTime',
    },
  },
  { timestamps: true }
);

// Compound index for unique leaderboard per period per user
leaderboardSchema.index({ user: 1, period: 1, team: 1 }, { unique: true });

export default mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
