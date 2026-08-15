import { Request, Response } from 'express';
import { Team } from '../models';

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find()
      .populate('leader', 'username email')
      .populate('members', 'username email');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
};

export const getTeamById = async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('leader', 'username email')
      .populate('members', 'username email');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
};

export const createTeam = async (req: Request, res: Response) => {
  try {
    const { name, description, leader } = req.body;
    const newTeam = new Team({ name, description, leader, members: [leader] });
    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create team' });
  }
};

export const updateTeam = async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(team);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update team' });
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
};

export const addTeamMember = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: userId } },
      { new: true }
    );
    res.json(team);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add team member' });
  }
};

export const removeTeamMember = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: userId } },
      { new: true }
    );
    res.json(team);
  } catch (error) {
    res.status(400).json({ error: 'Failed to remove team member' });
  }
};
