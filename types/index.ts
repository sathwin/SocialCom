export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  interests: string[];
  city: string;
  profileVisibility: 'public' | 'connections' | 'private';
  showAttendance: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  hostId: string;
  locationType: 'in-person' | 'virtual';
  address?: string;
  city?: string;
  virtualLink?: string;
  startDate: Date;
  durationMinutes: number;
  timezone: string;
  maxCapacity: number;
  currentAttendees: number;
  eventStructure: 'structured' | 'casual' | 'mixed';
  noiseLevel: 'quiet' | 'moderate' | 'lively';
  newcomerFriendly: boolean;
  isRecurring: boolean;
  iceBreakers: string[];
  attendeeIds: string[];
}

export interface RSVP {
  userId: string;
  eventId: string;
  status: 'going' | 'maybe' | 'interested';
  createdAt: Date;
  note?: string;
}

export interface Connection {
  userAId: string;
  userBId: string;
  eventsAttendedTogether: number;
  firstEventId: string;
}

export interface Filters {
  categories: string[];
  dateRange: [Date, Date] | null;
  locationRadius: number;
  newcomerFriendly: boolean;
  structured: boolean;
  quiet: boolean;
  searchQuery: string;
}

export const CATEGORIES = [
  'Book Clubs',
  'Hiking & Outdoors',
  'Tech Meetups',
  'Art & Crafts',
  'Food & Cooking',
  'Fitness',
  'Gaming',
  'Language Exchange',
  'Music',
  'Volunteering',
] as const;

export const INTERESTS = [
  'Reading',
  'Technology',
  'Hiking',
  'Art',
  'Cooking',
  'Fitness',
  'Board Games',
  'Music',
  'Travel',
  'Photography',
  'Writing',
  'Dancing',
  'Yoga',
  'Coffee',
  'Movies',
  'Podcasts',
  'Startups',
  'Design',
] as const;
