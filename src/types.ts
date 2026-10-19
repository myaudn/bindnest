export type ViewType = 
  | 'dashboard' 
  | 'my-library' 
  | 'reader' 
  | 'buddy-hub' 
  | 'curation' 
  | 'community' 
  | 'stats-streaks';

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  alt?: string;
  totalPages: number;
  currentPage: number;
  progressPercent?: number;
  status?: 'reading' | 'want' | 'finished' | 'want-to-read';
  readingStatus?: 'reading' | 'want-to-read' | 'completed';
  genre?: string;
  rating?: number;
  userRating?: number;
  readingTimeMinutes?: number;
  audioSync?: boolean;
  downloaded?: boolean;
  quotesCount?: number;
  lastReadTime?: string;
  badge?: string;
  estimatedHoursLeft?: string;
}

export interface Quote {
  id: string;
  text: string;
  bookTitle: string;
  author: string;
  page?: number;
  finishedAgo?: string;
  likes: number;
  isLiked?: boolean;
}

export interface FriendSession {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  alt?: string;
  readingBook: string;
  bookPage?: number;
  chapter?: string;
  status: 'active' | 'idle' | 'offline';
  mode: 'Silent' | 'Lo-Fi' | 'Normal';
  sessionNote?: string;
  sessionMinutes?: number;
}

export interface DiscussionComment {
  id: string;
  author: string;
  handle: string;
  avatarUrl: string;
  pageBadge: string;
  timeAgo: string;
  content: string;
  quote?: string;
  likes: number;
  repliesCount: number;
  isLiked?: boolean;
}

export interface BookClub {
  id: string;
  name: string;
  membersCount: string | number;
  onlineCount?: string | number;
  currentBook: string;
  currentBookCover?: string;
  nextSession?: string;
  nextMeeting?: string;
  coverUrl?: string;
  alt?: string;
  isJoined: boolean;
  genre?: string;
  description?: string;
  pacing?: string;
}

export interface LiveEvent {
  id: string;
  type: string;
  title: string;
  time?: string;
  scheduledFor?: string;
  host: string;
  description: string;
  attendeesCount?: number;
  attendees?: number;
  durationMinutes?: number;
  isRsvpd?: boolean;
  isRsvp?: boolean;
  accentBorder?: 'primary' | 'tertiary' | 'secondary' | string;
}

export interface CustomShelfData {
  id: string;
  title: string;
  description: string;
  booksCount?: number;
  booksRead?: number;
  accessType?: 'private' | 'friends' | 'public' | 'circle';
  isPublic?: boolean;
  circleName?: string;
  theme: 'linen' | 'terracotta' | 'sage' | 'midnight' | 'leather' | string;
  covers?: string[];
  books?: any[];
  icon?: string;
  activeThreads?: number;
  paceNote?: string;
}

export interface MilestoneBadgeData {
  id: string;
  title: string;
  description: string;
  unlockedDate?: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  current?: number;
  currentProgress?: number;
  target?: number;
  targetProgress?: number;
  unit?: string;
  icon: string;
  category?: 'speed' | 'habit' | 'social' | 'marathon';
}
