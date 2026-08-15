"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteActivity = exports.updateActivity = exports.createActivity = exports.getActivityById = exports.getActivities = void 0;
const models_1 = require("../models");
const getActivities = async (req, res) => {
    try {
        const { userId } = req.query;
        const filter = userId ? { user: userId } : {};
        const activities = await models_1.Activity.find(filter).populate('user', 'username');
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
};
exports.getActivities = getActivities;
const getActivityById = async (req, res) => {
    try {
        const activity = await models_1.Activity.findById(req.params.id).populate('user', 'username');
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json(activity);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activity' });
    }
};
exports.getActivityById = getActivityById;
const createActivity = async (req, res) => {
    try {
        const { user, type, duration, calories, description, date } = req.body;
        const newActivity = new models_1.Activity({ user, type, duration, calories, description, date });
        await newActivity.save();
        res.status(201).json(newActivity);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create activity' });
    }
};
exports.createActivity = createActivity;
const updateActivity = async (req, res) => {
    try {
        const activity = await models_1.Activity.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(activity);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update activity' });
    }
};
exports.updateActivity = updateActivity;
const deleteActivity = async (req, res) => {
    try {
        await models_1.Activity.findByIdAndDelete(req.params.id);
        res.json({ message: 'Activity deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete activity' });
    }
};
exports.deleteActivity = deleteActivity;
//# sourceMappingURL=activityController.js.map