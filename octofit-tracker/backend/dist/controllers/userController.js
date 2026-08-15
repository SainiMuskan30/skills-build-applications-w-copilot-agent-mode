"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const models_1 = require("../models");
const getUsers = async (req, res) => {
    try {
        const users = await models_1.User.find().select('-passwordHash');
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const user = await models_1.User.findById(req.params.id).select('-passwordHash');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};
exports.getUserById = getUserById;
const createUser = async (req, res) => {
    try {
        const { username, email, passwordHash, profile } = req.body;
        const newUser = new models_1.User({ username, email, passwordHash, profile });
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    try {
        const user = await models_1.User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).select('-passwordHash');
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update user' });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        await models_1.User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map