"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLeaderboard = exports.getUserRank = exports.getLeaderboard = void 0;
const models_1 = require("../models");
const getLeaderboard = async (req, res) => {
    try {
        const { period = 'allTime', team } = req.query;
        const filter = { period };
        if (team)
            filter.team = team;
        const leaderboard = await models_1.Leaderboard.find(filter)
            .sort({ score: -1 })
            .populate('user', 'username profile')
            .populate('team', 'name');
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
};
exports.getLeaderboard = getLeaderboard;
const getUserRank = async (req, res) => {
    try {
        const { userId } = req.params;
        const { period = 'allTime' } = req.query;
        const filter = {
            user: userId,
            period,
        };
        const userLeaderboard = await models_1.Leaderboard.findOne(filter).populate('user', 'username profile');
        if (!userLeaderboard) {
            return res.status(404).json({ error: 'User rank not found' });
        }
        res.json(userLeaderboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user rank' });
    }
};
exports.getUserRank = getUserRank;
const updateLeaderboard = async (req, res) => {
    try {
        const { userId, totalCaloriesBurned, activitiesCount, averageDuration, score, period } = req.body;
        let leaderboard = await models_1.Leaderboard.findOneAndUpdate({ user: userId, period }, {
            totalCaloriesBurned,
            activitiesCount,
            averageDuration,
            score,
        }, { upsert: true, new: true });
        res.json(leaderboard);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update leaderboard' });
    }
};
exports.updateLeaderboard = updateLeaderboard;
//# sourceMappingURL=leaderboardController.js.map