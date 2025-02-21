import dotenv from "dotenv";

import mongoose from 'mongoose';

dotenv.config();
const connectToDatabase = async (): Promise<void> => {

  try { const MONGODB_URI = process.env.MONGODB_URI!;
    
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