"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTeamMember = exports.addTeamMember = exports.deleteTeam = exports.updateTeam = exports.createTeam = exports.getTeamById = exports.getTeams = void 0;
const models_1 = require("../models");
const getTeams = async (req, res) => {
    try {
        const teams = await models_1.Team.find()
            .populate('leader', 'username email')
            .populate('members', 'username email');
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
};
exports.getTeams = getTeams;
const getTeamById = async (req, res) => {
    try {
        const team = await models_1.Team.findById(req.params.id)
            .populate('leader', 'username email')
            .populate('members', 'username email');
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json(team);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team' });
    }
};
exports.getTeamById = getTeamById;
const createTeam = async (req, res) => {
    try {
        const { name, description, leader } = req.body;
        const newTeam = new models_1.Team({ name, description, leader, members: [leader] });
        await newTeam.save();
        res.status(201).json(newTeam);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create team' });
    }
};
exports.createTeam = createTeam;
const updateTeam = async (req, res) => {
    try {
        const team = await models_1.Team.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(team);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update team' });
    }
};
exports.updateTeam = updateTeam;
const deleteTeam = async (req, res) => {
    try {
        await models_1.Team.findByIdAndDelete(req.params.id);
        res.json({ message: 'Team deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete team' });
    }
};
exports.deleteTeam = deleteTeam;
const addTeamMember = async (req, res) => {
    try {
        const { userId } = req.body;
        const team = await models_1.Team.findByIdAndUpdate(req.params.id, { $addToSet: { members: userId } }, { new: true });
        res.json(team);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to add team member' });
    }
};
exports.addTeamMember = addTeamMember;
const removeTeamMember = async (req, res) => {
    try {
        const { userId } = req.body;
        const team = await models_1.Team.findByIdAndUpdate(req.params.id, { $pull: { members: userId } }, { new: true });
        res.json(team);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to remove team member' });
    }
};
exports.removeTeamMember = removeTeamMember;
//# sourceMappingURL=teamController.js.map