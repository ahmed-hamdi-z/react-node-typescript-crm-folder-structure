import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateToken = (userId: string, role: string): string => {
  return jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): { id: string; role: string } => {
  return jwt.verify(token, JWT_SECRET) as { id: string; role: string };
};

export const addTokenToUser = async (user: any, token: string): Promise<void> => {
  const expiresAt = new Date(Date.now() + 3600000).toISOString(); // 1 hour from now
  user.tokens = user.tokens.concat({ token, expiresAt });
  await user.save();
};

export const removeTokenFromUser = async (user: any, token: string): Promise<void> => {
  user.tokens = user.tokens.filter((t: any) => t.token !== token);
  await user.save();
};