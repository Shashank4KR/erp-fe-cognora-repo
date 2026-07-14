export type StatCard = {
  id: string;
  title: string;
  value: string | number;
  change: string;
  icon: string;
  backgroundColor: string;
  iconColor: string;
};

export type AttendanceData = {
  day: string;
  percentage: number;
};

export type Activity = {
  id: string;
  description: string;
  timeAgo: string;
  iconBg: string;
  icon: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  month: string;
  day: number;
};

export type StudentClass = {
  id: string;
  name: string;
  count: number;
  color: string;
};

export type FeesData = {
  week: string;
  amount: number;
};
