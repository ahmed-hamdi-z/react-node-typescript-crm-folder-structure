import express from 'express';

import {
  InvalidCredentialsError,
  AuthError,
  UserNotFoundError,
  LogoutFailedError,
} from '../utils/errors/AuthErrors';
import { createUser, getUserByEmail, getUserByRole } from '../models/auth/users';
import { authentication, randomString } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username, role } = req.body;
    if (!email || !password || !username) {
      throw new AuthError('Email, password, and username are required');
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new AuthError('User already exists');
    }

    const salt = randomString();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
      role,
    });

    res.status(200).json(user).end();

  } catch (error) {
    if (error instanceof AuthError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
};

export const login = async (req: express.Request, res: express.Response) => {

  const AUTH_COOKIE_TOKEN = process.env.AUTH_COOKIE_TOKEN || 'click-crm-auth-cookie';

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AuthError('Email and password are required');
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password +role');
    if (!user) {
      throw new UserNotFoundError();
    }

    const isMatchHash = await authentication(user.authentication.salt, password);
    if (user.authentication.password !== isMatchHash) {
      throw new InvalidCredentialsError();
    }

    const salt = randomString();
    user.authentication.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    res.cookie(AUTH_COOKIE_TOKEN, user.authentication.sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3600000,
      domain: 'localhost',
      path: '/',
    });

    res.status(200).json(user).end();
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(400).json({ error: error.message });
    } else {
      throw new AuthError('Failed to login');
    }
  }
};

// export const logout = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
//     if (!token) {
//       throw new LogoutFailedError();
//     }

//     const user = await User.findOne({ tokens: { $elemMatch: { token } } });
//     if (!user) {
//       throw new LogoutFailedError();
//     }

//     await removeTokenFromUser(user, token);

//     res.clearCookie('token');
//     req.session.destroy((err) => {
//       if (err) {
//         throw new LogoutFailedError();
//       }
//       res.send('Logged out');
//     });
//   } catch (error: unknown) {
//     if (error instanceof AuthError) {
//       res.status(400).json({ error: error.message });
//     } else {
//       res.status(500).json({ error: 'Failed to logout' });
//     }
//   }
// };