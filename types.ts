
export interface User {
  username: string;
}

export enum Category {
  LOST_FOUND = 'Lost & Found',
  ACADEMIC_HELP = 'Academic Help',
  EVENTS = 'Events',
  DONATIONS = 'Donations',
  SOS = 'Urgent SOS',
  RESOURCE_SHARE = 'Resource Sharing',
  VOLUNTEERING = 'Volunteering'
}

export enum Urgency {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export interface Post {
  id: number;
  author: string;
  avatarUrl: string;
  timestamp: string;
  title: string;
  description: string;
  category: Category;
  urgency: Urgency;
  location: string;
  type: 'problem' | 'solution';
}

export interface UserStats {
  problemsSolved: number;
  solutionsOffered: number;
  points: number;
}
