
import { Post, Category, Urgency, UserStats } from './types';

export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    author: 'Alice Johnson',
    avatarUrl: 'https://picsum.photos/seed/alice/40/40',
    timestamp: '2024-07-29T10:00:00Z',
    title: 'Lost Library Card near Hostel C',
    description: 'I seem to have misplaced my library card somewhere between the main library and Hostel C. It has my name on it. Please let me know if you find it!',
    category: Category.LOST_FOUND,
    urgency: Urgency.MEDIUM,
    location: 'Campus Area',
    type: 'problem',
  },
  {
    id: 2,
    author: 'Bob Williams',
    avatarUrl: 'https://picsum.photos/seed/bob/40/40',
    timestamp: '2024-07-29T09:30:00Z',
    title: 'Offering Free Engineering Books',
    description: 'I have a set of first-year engineering textbooks (Physics, Chemistry, Maths) that I no longer need. They are in great condition. Free for any junior who needs them.',
    category: Category.RESOURCE_SHARE,
    urgency: Urgency.LOW,
    location: 'Hostel B',
    type: 'solution',
  },
  {
    id: 3,
    author: 'Charlie Brown',
    avatarUrl: 'https://picsum.photos/seed/charlie/40/40',
    timestamp: '2024-07-28T18:45:00Z',
    title: 'Urgent need for O+ blood at City Hospital',
    description: 'A friend is in need of O+ blood for an emergency surgery at City Hospital. Any donors available, please contact me immediately. This is critical.',
    category: Category.SOS,
    urgency: Urgency.HIGH,
    location: 'City Hospital',
    type: 'problem',
  },
  {
    id: 4,
    author: 'Diana Prince',
    avatarUrl: 'https://picsum.photos/seed/diana/40/40',
    timestamp: '2024-07-28T15:20:00Z',
    title: 'Volunteers needed for weekend clean-up drive',
    description: 'We are organizing a clean-up drive at the local park this Saturday morning. We need a few more hands to make it a success. Refreshments will be provided!',
    category: Category.VOLUNTEERING,
    urgency: Urgency.MEDIUM,
    location: 'Local Park',
    type: 'solution',
  },
];

export const MOCK_USER_STATS: UserStats = {
  problemsSolved: 5,
  solutionsOffered: 12,
  points: 170,
};

export const CATEGORY_OPTIONS = Object.values(Category);
export const URGENCY_OPTIONS = Object.values(Urgency);
