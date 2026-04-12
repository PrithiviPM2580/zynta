import User from "../models/user.model";

export const findByIdUserService = async (userId: string) => {
  return User.findById(userId).lean();
};
