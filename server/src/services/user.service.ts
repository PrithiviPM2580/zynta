import User from "../models/user.model";

export const findByIdUserService = async (userId: string) => {
  return User.findById(userId).lean();
};

export const getUsersService = async (userId: string) => {
  const users = await User.find({ _id: { $ne: userId } })
    .select("-password")
    .lean();
  return users;
};
