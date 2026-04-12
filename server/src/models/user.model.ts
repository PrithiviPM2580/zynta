import mongoose, { Document, Schema } from "mongoose";
import { hashValue, compareValue } from "../utils/bcrypt.util";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        if (ret) delete (ret as any).password;
        return ret;
      },
    },
  },
);

userSchema.pre<UserDocument>("save", async function () {
  if (this.password && this.isModified("password")) {
    this.password = await hashValue(this.password);
  }
});

userSchema.methods.comparePassword = async function (password: string) {
  return compareValue(password, this.password);
};

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
