export type User = {
  id: string;
  avatar: string;
  username: string;
  bio: string;
  allowFcm: boolean;
  createdAt: Date;
  contributions: Contributions;
};

export type Contributions = {
  totalContributions: number;
  weekContributions: number;
  todayContributions: number;
};

export type UserResponse = {
  me: User;
};
