"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const activityController_1 = require("../controllers/activityController");
const router = express_1.default.Router();
router.get('/', activityController_1.getActivities);
router.get('/:id', activityController_1.getActivityById);
router.post('/', activityController_1.createActivity);
router.put('/:id', activityController_1.updateActivity);
router.delete('/:id', activityController_1.deleteActivity);
exports.default = router;
//# sourceMappingURL=activities.js.map