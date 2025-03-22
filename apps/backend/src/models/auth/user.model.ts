import mongoose from "mongoose";
import { compareValue, hashValue } from "../../utils/bcrypt";

export interface UserDoc extends mongoose.Document {
  userName: String;
  email: string;
  password: string;
  role: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  omitPassword(): Pick < UserDoc, "_id" | "email" | "role" | "verified" | "createdAt" | "updatedAt" | "__v" >;
}
const userSchema = new mongoose.Schema<UserDoc>(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, enum: ["user", "admin", "manager"], default: "user" },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await hashValue(this.password);
  next();
});

userSchema.methods.comparePassword = async function (val: string) {
  return compareValue(val, this.password);
};

userSchema.methods.omitPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
}
const UserModel = mongoose.model<UserDoc>("User", userSchema);
export default UserModel;
