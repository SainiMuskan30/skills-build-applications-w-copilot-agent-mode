import { Request, Response } from 'express';
import { Leaderboard } from '../models';

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const { period = 'allTime', team } = req.query;
    const filter: any = { period };
    if (team) filter.team = team;
    
    const leaderboard = await Leaderboard.find(filter)
      .sort({ score: -1 })
      .populate('user', 'username profile')
      .populate('team', 'name');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};

export const getUserRank = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { period = 'allTime' } = req.query;
    
    const filter: any = {
      user: userId,
      period,
    };
    
    const userLeaderboard = await Leaderboard.findOne(filter).populate(
      'user',
      'username profile'
    );
    
    if (!userLeaderboard) {
      return res.status(404).json({ error: 'User rank not found' });
    }
    res.json(userLeaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user rank' });
  }
};

export const updateLeaderboard = async (req: Request, res: Response) => {
  try {
    const { userId, totalCaloriesBurned, activitiesCount, averageDuration, score, period } =
      req.body;
    
    let leaderboard = await Leaderboard.findOneAndUpdate(
      { user: userId, period },
      {
        totalCaloriesBurned,
        activitiesCount,
        averageDuration,
        score,
      },
      { upsert: true, new: true }
    );
    
    res.json(leaderboard);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update leaderboard' });
  }
};
