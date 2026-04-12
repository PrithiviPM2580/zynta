import User from "../models/user.model";
import {
  NotFoundException,
  UnauthorizedException,
} from "../utils/app-error.util";
import type {
  LoginSchemaType,
  RegisterSchemaType,
} from "../validators/auth.validator";

export const registerService = async (body: RegisterSchemaType) => {
  const { email } = body;

  const existingUser = await User.findOne({ email }).lean();

  if (existingUser) {
    throw new UnauthorizedException("User already exists with this email");
  }

  const newUser = new User({
    ...body,
  });

  await newUser.save();
  return newUser;
};

export const loginService = async (body: LoginSchemaType) => {
  const { email, password } = body;

  const user = await User.findOne({ email }).lean();
  if (!user) {
    throw new NotFoundException("User not found with this email");
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new UnauthorizedException("Invalid password");
  }

  return user;
};
