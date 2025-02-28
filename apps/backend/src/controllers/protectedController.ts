import express from 'express';

import { deleteUserById, getUserById, getUsers } from '../models/auth/users';

export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      throw new Error('User not found');
    }

    res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get current user');
  }
}

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();
    if (!users) {
      throw new Error('Users not found');
    }

    res.status(200).json(users).end();
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get all users');
  }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params
    const user = await deleteUserById(id);  

    if (!user) {
      throw new Error('User not found');
    }

    res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    throw new Error('Failed to delete user');
  }
}