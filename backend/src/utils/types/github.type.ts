export type GitHubUser = {
  avatar_url: string;
  id: string;
  name: string;
  login: string;
  bio: string;
};

export type GitHubContribution = {
  user: {
    contributionsCollection: ContributionsCollection;
  };
};

export type ContributionsCollection = {
  contributionCalendar: ContributionCalendar;
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: ContributionWeek[];
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export type ContributionDay = {
  contributionCount: number;
  date: Date;
  weekday: number;
};
