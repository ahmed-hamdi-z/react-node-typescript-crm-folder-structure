import mongoose, { Document, Model, Schema } from 'mongoose';
import { HashPasswords } from '@/helpers';

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  role: { type: String, enum: ['user', 'admin', 'manager'], default: 'user', },
  verified: { type: Boolean, default: false },
  // first_name: { type: String, trim: true },
  // last_name: { type: String, trim: true },
  // image: { type: String, default: '' },
  // phone: { type: String, trim: true },
  // country: { type: String, trim: true },
}, 
{ timestamps: true });

export interface User extends Document {
  username: string;
  email: string;
  authentication: {
    password: string;
    salt: string;
    sessionToken: string | null;
  };
  role: string;
  verified: boolean;
  comparePassword(value: string): Promise<boolean>;
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

export const comparePasswords = async (value: string, salt: string, hash: string) => await HashPasswords(salt, value, hash);

userSchema.methods.comparePassword = async function (value: string) { 
  return comparePasswords(value, this.authentication.salt, this.authentication.password); 
};