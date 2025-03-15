import mongoose from "mongoose";

export interface VerificationCode extends mongoose.Document {
    email: string;
    code: string;
    createdAt: Date;
}