import { Request, Response } from 'express';
import { User } from '../models';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, passwordHash, profile } = req.body;
    const newUser = new User({ username, email, passwordHash, profile });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select('-passwordHash');
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
