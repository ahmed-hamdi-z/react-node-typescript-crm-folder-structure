// models/auth/userSchemas.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },

  role: { type: String, enum: ['user', 'admin'], default: 'user', select: false },
  // first_name: { type: String, trim: true },
  // last_name: { type: String, trim: true },
  // image: { type: String, default: '' },
  // phone: { type: String, trim: true },
  // country: { type: String, trim: true },
  created_at: { type: String, default: new Date().toISOString() },
  updated_at: { type: String, default: new Date().toISOString() },
});

export interface User extends Document {
  username: string;
  email: string; 
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
  role: string;
  created_at: string;
  updated_at: string;
}


export const UserModle: Model<User> = mongoose.model<User>('User', userSchema);

export const getUsers = () => UserModle.find();

export const getUserByEmail = (email: string) => UserModle.findOne({ email });

export const getUserById = (id: string) => UserModle.findById(id);

export const getUserByRole = (role: string) => UserModle.findOne({ role });

export const getUserBySessionToken = (sessionToken: string) => UserModle.findOne({
  'authentication.sessionToken': sessionToken
});

export const createUser = (values: Record<string, any>) => new UserModle(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) => UserModle.findByIdAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, any>) => UserModle.findByIdAndUpdate(id, values);