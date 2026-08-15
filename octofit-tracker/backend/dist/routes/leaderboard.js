"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leaderboardController_1 = require("../controllers/leaderboardController");
const router = express_1.default.Router();
router.get('/', leaderboardController_1.getLeaderboard);
router.get('/user/:userId', leaderboardController_1.getUserRank);
router.put('/', leaderboardController_1.updateLeaderboard);
exports.default = router;
//# sourceMappingURL=leaderboard.js.map