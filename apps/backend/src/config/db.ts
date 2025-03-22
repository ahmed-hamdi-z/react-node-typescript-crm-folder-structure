import mongoose from 'mongoose';
import { MONGODB_URI } from '../constants/env';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
export default connectToDatabase;