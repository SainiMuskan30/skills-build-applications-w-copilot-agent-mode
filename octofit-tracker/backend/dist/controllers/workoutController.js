"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkoutsByDifficulty = exports.deleteWorkout = exports.updateWorkout = exports.createWorkout = exports.getWorkoutById = exports.getWorkouts = void 0;
const models_1 = require("../models");
const getWorkouts = async (req, res) => {
    try {
        const { difficulty } = req.query;
        const filter = difficulty ? { difficulty } : {};
        const workouts = await models_1.Workout.find(filter);
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
};
exports.getWorkouts = getWorkouts;
const getWorkoutById = async (req, res) => {
    try {
        const workout = await models_1.Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json(workout);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout' });
    }
};
exports.getWorkoutById = getWorkoutById;
const createWorkout = async (req, res) => {
    try {
        const { name, description, exercises, difficulty, estimatedDuration, targetMuscles } = req.body;
        const newWorkout = new models_1.Workout({
            name,
            description,
            exercises,
            difficulty,
            estimatedDuration,
            targetMuscles,
        });
        await newWorkout.save();
        res.status(201).json(newWorkout);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create workout' });
    }
};
exports.createWorkout = createWorkout;
const updateWorkout = async (req, res) => {
    try {
        const workout = await models_1.Workout.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(workout);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update workout' });
    }
};
exports.updateWorkout = updateWorkout;
const deleteWorkout = async (req, res) => {
    try {
        await models_1.Workout.findByIdAndDelete(req.params.id);
        res.json({ message: 'Workout deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete workout' });
    }
};
exports.deleteWorkout = deleteWorkout;
const getWorkoutsByDifficulty = async (req, res) => {
    try {
        const { difficulty } = req.params;
        const filter = { difficulty };
        const workouts = await models_1.Workout.find(filter);
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts by difficulty' });
    }
};
exports.getWorkoutsByDifficulty = getWorkoutsByDifficulty;
//# sourceMappingURL=workoutController.js.map