import { z } from 'zod';
import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Schema for user registration
// Schema for user registration
export const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['user', 'admin']).optional().default('user'),
});


// Schema for user login
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});


// Schema for token verification
export const tokenSchema = z.object({
  token: z.string(),
});


// Schema for role-based access
export const roleSchema = z.object({
  role: z.enum(['user', 'admin']),
});


// Zod schema for User validation
export const userSchemaZod = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['user', 'admin']).optional().default('user'),
});

// TypeScript interface for User
export interface IUser extends Document {
  username: string;
  password: string;
  role: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Mongoose schema for User
const userSchemaResolver: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

// Hash password before saving
userSchemaResolver.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare passwords
userSchemaResolver.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the Mongoose model
const User: Model<IUser> = mongoose.model<IUser>('User', userSchemaResolver);
export default User;