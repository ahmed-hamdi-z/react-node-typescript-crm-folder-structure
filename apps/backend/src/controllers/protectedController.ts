import express from 'express';

import { getUserById, getUsers } from '../models/auth/users';

export const getCurrentUser = async (req: express.Request, res: express.Response) => {
  try {
    const user = await getUserById(req.params.id);

    res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get all users');
  }
}

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();

    res.status(200).json(users).end();
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get all users');
  }
}

