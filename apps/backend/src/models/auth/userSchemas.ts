import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// Zod schema for User validation
export const userSchemaZod = z.object({
  userId: z.string().optional(),
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['user', 'admin']).optional().default('user'),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  image: z.string().optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
  // sale_code: z.string().optional(),
  token: z.string().optional(),
  new_token: z.string().optional(),
  old_token: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

// Schema for token verification
export const tokenSchema = z.object({
  token: z.string(),
});

// TypeScript interface for User
export interface IUser extends Document {
  userId: string;
  username: string;
  email: string;
  password: string;
  role: string;
  first_name: string;
  last_name: string;
  image: string;
  phone: string;
  country: string;
  // sale_code: string;
  token: string;
  new_token: string;
  old_token: string;
  created_at: string;
  updated_at: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Mongoose schema for User
const userSchema: Schema = new Schema({
  userId: { type: String, unique: true },
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  first_name: { type: String, trim: true },
  last_name: { type: String, trim: true },
  image: { type: String, default: '' },
  phone: { type: String, trim: true },
  country: { type: String, trim: true },
  // sale_code: { type: String, trim: true },
  // roles: { type: [String], default: ['user'] },
  token: { type: String, default: '' },
  new_token: { type: String, default: '' },
  old_token: { type: String, default: '' },
  created_at: { type: String, default: new Date().toISOString() },
  updated_at: { type: String, default: new Date().toISOString() },
});

// Hash password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS || 10));
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the Mongoose model
export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);