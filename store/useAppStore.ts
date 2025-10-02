import { create } from 'zustand';
import { User, Event, RSVP, Filters } from '@/types';
import { mockUsers, mockEvents, mockRSVPs, mockConnections, currentUser } from '@/lib/mockData';

interface AppState {
  // Auth
  isLoggedIn: boolean;
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;

  // Events
  events: Event[];
  savedEventIds: string[];
  toggleSaveEvent: (eventId: string) => void;
  getEventById: (eventId: string) => Event | undefined;

  // RSVPs
  userRSVPs: RSVP[];
  addRSVP: (eventId: string, status: 'going' | 'maybe' | 'interested', note?: string) => void;
  cancelRSVP: (eventId: string) => void;
  getUserRSVPForEvent: (eventId: string) => RSVP | undefined;

  // Filters
  filters: Filters;
  updateFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;

  // Users & Connections
  users: User[];
  connections: { userAId: string; userBId: string; eventsAttendedTogether: number; firstEventId: string }[];
  getUserById: (userId: string) => User | undefined;
  getMutualConnectionsForEvent: (eventId: string) => User[];
}

const defaultFilters: Filters = {
  categories: [],
  dateRange: null,
  locationRadius: 50,
  newcomerFriendly: false,
  structured: false,
  quiet: false,
  searchQuery: '',
};

export const useAppStore = create<AppState>((set, get) => ({
  // Auth
  isLoggedIn: true, // Start logged in for demo
  currentUser: currentUser,
  login: (user) => set({ isLoggedIn: true, currentUser: user }),
  logout: () => set({ isLoggedIn: false, currentUser: null }),

  // Events
  events: mockEvents,
  savedEventIds: ['event-1', 'event-3'], // Demo: user has saved a few events
  toggleSaveEvent: (eventId) =>
    set((state) => ({
      savedEventIds: state.savedEventIds.includes(eventId)
        ? state.savedEventIds.filter((id) => id !== eventId)
        : [...state.savedEventIds, eventId],
    })),
  getEventById: (eventId) => get().events.find((e) => e.id === eventId),

  // RSVPs
  userRSVPs: mockRSVPs.filter((rsvp) => rsvp.userId === currentUser.id),
  addRSVP: (eventId, status, note) => {
    const state = get();
    const event = state.events.find((e) => e.id === eventId);
    if (!event || !state.currentUser) return;

    // Remove existing RSVP if exists
    const filteredRSVPs = state.userRSVPs.filter((r) => r.eventId !== eventId);

    // Add new RSVP
    const newRSVP: RSVP = {
      userId: state.currentUser.id,
      eventId,
      status,
      createdAt: new Date(),
      note,
    };

    // Update event attendee count and list
    const updatedEvents = state.events.map((e) => {
      if (e.id === eventId) {
        const isAlreadyAttending = e.attendeeIds.includes(state.currentUser!.id);
        return {
          ...e,
          currentAttendees: isAlreadyAttending ? e.currentAttendees : e.currentAttendees + 1,
          attendeeIds: isAlreadyAttending ? e.attendeeIds : [...e.attendeeIds, state.currentUser!.id],
        };
      }
      return e;
    });

    set({
      userRSVPs: [...filteredRSVPs, newRSVP],
      events: updatedEvents,
    });
  },
  cancelRSVP: (eventId) => {
    const state = get();
    if (!state.currentUser) return;

    // Remove RSVP
    const filteredRSVPs = state.userRSVPs.filter((r) => r.eventId !== eventId);

    // Update event attendee count and list
    const updatedEvents = state.events.map((e) => {
      if (e.id === eventId) {
        return {
          ...e,
          currentAttendees: Math.max(0, e.currentAttendees - 1),
          attendeeIds: e.attendeeIds.filter((id) => id !== state.currentUser!.id),
        };
      }
      return e;
    });

    set({
      userRSVPs: filteredRSVPs,
      events: updatedEvents,
    });
  },
  getUserRSVPForEvent: (eventId) => get().userRSVPs.find((r) => r.eventId === eventId),

  // Filters
  filters: defaultFilters,
  updateFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  resetFilters: () => set({ filters: defaultFilters }),

  // Users & Connections
  users: mockUsers,
  connections: mockConnections,
  getUserById: (userId) => get().users.find((u) => u.id === userId),
  getMutualConnectionsForEvent: (eventId) => {
    const state = get();
    const event = state.events.find((e) => e.id === eventId);
    if (!event || !state.currentUser) return [];

    const mutualIds = event.attendeeIds.filter((attendeeId) => {
      return state.connections.some(
        (conn) =>
          (conn.userAId === state.currentUser!.id && conn.userBId === attendeeId) ||
          (conn.userBId === state.currentUser!.id && conn.userAId === attendeeId)
      );
    });

    return mutualIds.map((id) => state.getUserById(id)).filter((u): u is User => u !== undefined);
  },
}));
