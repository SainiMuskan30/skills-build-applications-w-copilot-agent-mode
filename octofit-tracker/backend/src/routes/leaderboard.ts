import express from 'express';
import {
  getLeaderboard,
  getUserRank,
  updateLeaderboard,
} from '../controllers/leaderboardController';

const router = express.Router();

router.get('/', getLeaderboard);
router.get('/user/:userId', getUserRank);
router.put('/', updateLeaderboard);

export default router;
