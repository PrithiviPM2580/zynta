import User from "../models/user.model";
import { SEED_USERS } from "../constants/seed.constant";

export const seedUsers = async () => {
  const usersToCreate = SEED_USERS;
  const emails = usersToCreate.map((user) => user.email);

  const existingUsers = await User.find({ email: { $in: emails } })
    .select("email")
    .lean();

  const existingEmailSet = new Set(existingUsers.map((user) => user.email));
  const newUsers = usersToCreate.filter(
    (user) => !existingEmailSet.has(user.email),
  );

  if (!newUsers.length) {
    return {
      createdCount: 0,
      skippedCount: usersToCreate.length,
      message: "Seed users already exist",
    };
  }

  await User.create(newUsers);

  return {
    createdCount: newUsers.length,
    skippedCount: usersToCreate.length - newUsers.length,
    message: "Seed users created successfully",
  };
};
