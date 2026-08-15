import { Request, Response } from 'express';
import { Activity } from '../models';

export const getActivities = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const filter: any = userId ? { user: userId } : {};
    const activities = await Activity.find(filter).populate('user', 'username');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
};

export const getActivityById = async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('user', 'username');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
};

export const createActivity = async (req: Request, res: Response) => {
  try {
    const { user, type, duration, calories, description, date } = req.body;
    const newActivity = new Activity({ user, type, duration, calories, description, date });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create activity' });
  }
};

export const updateActivity = async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update activity' });
  }
};

export const deleteActivity = async (req: Request, res: Response) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
};
