export type Typename = {
  __typename: string;
};

export type User = {
  id: string;
  avatar: string;
  username: string;
  bio: string;
  allowFcm: boolean;
  createdAt: Date;
  contributions: Contributions;
  weekdays: Weekday[];
} & Typename;

export type Contributions = {
  total: number;
  week: number;
  today: number;
} & Typename;

export type Weekday = {
  count: number;
  day: number;
} & Typename;

export type UserResponse = {
  me: User;
};
