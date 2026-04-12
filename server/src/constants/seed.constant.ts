export type SeedUserInput = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export const SEED_USERS: SeedUserInput[] = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    avatar: "default_avatar.png",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "password456",
    avatar: "default_avatar.png",
  },
  {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    password: "password789",
    avatar: "default_avatar.png",
  },
  {
    name: "Priya Kumar",
    email: "priya.kumar@example.com",
    password: "password321",
    avatar: "default_avatar.png",
  },
  {
    name: "Liam Brown",
    email: "liam.brown@example.com",
    password: "password654",
    avatar: "default_avatar.png",
  },
];
