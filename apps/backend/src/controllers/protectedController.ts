import express from 'express';

import { deleteUserById, getUserById, getUsers } from '../models/auth/user.model';
import { FailedError, HandelErrors, NotFound } from '@/utils/errors/Errors';

/**
 * Retrieves a user by ID from the database.
 * - Retrieves the user ID from the request params.
 * - Calls the getUserById function to retrieve the user.
 * - Throws an error if the user is not found.
 * - Responds with the user object upon success.
 * - Handles errors by sending appropriate HTTP responses.
 * @param req - Express request object containing the user ID in the params.
 * @param res - Express response object used to send a response back to the client.
 */
export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      throw new NotFound('User not found');
    }

    res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    throw new FailedError('Failed to get current user');
  }
}
/**
 * Retrieves all users from the database.
 * - Calls the getUsers function to retrieve all user records.
 * - Throws an error if no users are found.
 * - Responds with the list of users upon success.
 * - Handles errors by sending appropriate HTTP responses.
 * @param req - Express request object.
 * @param res - Express response object used to send a response back to the client.
 */
export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();
    if (!users) {
      throw new NotFound('Users not found');
    }
    res.status(200).json(users).end();
  } catch (error) {
    console.log(error);
    throw new FailedError('Failed to get all users');
  }
}
/**
 * Deletes a user by ID from the database.
 * - Retrieves the user ID from the request params.
 * - Calls the deleteUserById function to delete the user.
 * - Throws an error if the user is not found.
 * - Responds with the deleted user object upon success.
 * - Handles errors by sending appropriate HTTP responses.
 * @param req - Express request object containing the user ID in the params.
 * @param res - Express response object used to send a response back to the client.
 */
export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params
    const user = await deleteUserById(id);
    if (!user) {
      throw new NotFound('User not found');
    }
    res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    throw new FailedError('Failed to delete user');
  }
};
/**
 * Updates a user's username in the database.
 * - Retrieves the user ID from the request params and the new username from the request body.
 * - Validates that the username is provided and throws an error if it is missing.
 * - Calls the getUserById function to retrieve the existing user.
 * - Throws an error if the user is not found.
 * - Updates the user's username and saves the changes.
 * - Responds with the updated user object upon success.
 * - Handles errors by logging and throwing appropriate exceptions.
 * @param req - Express request object containing the user ID in the params and username in the body.
 * @param res - Express response object used to send a response back to the client.
 * @throws {UserNotFoundError} If the username is missing or the user is not found.
 * @throws {updateFailedError} If the update operation fails.
 */
export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      throw new HandelErrors('Username is required');
    }

    const user = await getUserById(id);
    if (!user) {
      throw new NotFound('User not found');
    }
    user.username = username;
    await user.save();

    res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    throw new FailedError('Failed to update user');
  }
}