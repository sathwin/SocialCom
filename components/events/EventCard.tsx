'use client';

import Link from 'next/link';
import { Event } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import { Heart, Users, MapPin, Video, Calendar, Sparkles } from 'lucide-react';
import { formatEventDateTime, isEventAlmostFull, isEventFull, truncateText } from '@/lib/utils';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: Event;
  showQuickRSVP?: boolean;
}

export function EventCard({ event, showQuickRSVP = true }: EventCardProps) {
  const { savedEventIds, toggleSaveEvent, getMutualConnectionsForEvent, getUserRSVPForEvent, isLoggedIn } =
    useAppStore();

  const isSaved = savedEventIds.includes(event.id);
  const mutualConnections = getMutualConnectionsForEvent(event.id);
  const userRSVP = getUserRSVPForEvent(event.id);
  const isFull = isEventFull(event.currentAttendees, event.maxCapacity);
  const isAlmostFull = isEventAlmostFull(event.currentAttendees, event.maxCapacity);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveEvent(event.id);
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      <Link href={`/events/${event.id}`}>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          {/* Cover Image */}
          <div className="relative h-48 w-full overflow-hidden bg-slate-100">
            <img
              src={event.coverImage}
              alt={event.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Category Badge */}
            <div className="absolute left-3 top-3">
              <Badge variant="default" className="shadow-lg">
                {event.category}
              </Badge>
            </div>
            {/* Save Button */}
            {isLoggedIn && (
              <button
                onClick={handleSaveToggle}
                className={cn(
                  'absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-md transition-all hover:scale-110',
                  isSaved ? 'text-red-500' : 'text-slate-400 hover:text-red-500'
                )}
              >
                <Heart className={cn('h-4 w-4', isSaved && 'fill-current')} />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Title */}
            <h3 className="text-lg font-semibold text-slate-900 leading-tight line-clamp-2 text-balance">
              {event.title}
            </h3>

            {/* Date & Location */}
            <div className="space-y-1.5">
              <div className="flex items-center text-sm text-slate-600">
                <Calendar className="mr-1.5 h-4 w-4" />
                <span suppressHydrationWarning>{formatEventDateTime(event.startDate)}</span>
              </div>
              <div className="flex items-center text-sm text-slate-600">
                {event.locationType === 'in-person' ? (
                  <>
                    <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{event.city}</span>
                  </>
                ) : (
                  <>
                    <Video className="mr-1.5 h-4 w-4" />
                    <span>Virtual</span>
                  </>
                )}
              </div>
            </div>

            {/* Attendees & Mutual Connections */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1 text-slate-600">
                <Users className="h-4 w-4" />
                <span>
                  {event.currentAttendees}/{event.maxCapacity} attending
                </span>
                {isAlmostFull && !isFull && (
                  <Badge variant="secondary" className="ml-2 animate-pulse text-xs">
                    Only {event.maxCapacity - event.currentAttendees} spots!
                  </Badge>
                )}
                {isFull && (
                  <Badge variant="outline" className="ml-2 text-xs">
                    Full
                  </Badge>
                )}
              </div>
            </div>

            {isLoggedIn && mutualConnections.length > 0 && (
              <div className="flex items-center space-x-1 text-sm text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="font-medium">
                  {mutualConnections.length} {mutualConnections.length === 1 ? 'friend' : 'friends'} going
                </span>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {event.newcomerFriendly && (
                <Badge variant="success" className="text-xs">
                  Newcomer-friendly
                </Badge>
              )}
              {event.eventStructure === 'structured' && (
                <Badge variant="outline" className="text-xs">
                  Structured
                </Badge>
              )}
              {event.noiseLevel === 'quiet' && (
                <Badge variant="quiet" className="text-xs">
                  Quiet
                </Badge>
              )}
            </div>

            {/* RSVP Button */}
            {showQuickRSVP && isLoggedIn && (
              <div className="pt-2">
                {userRSVP ? (
                  <Button variant="outline" size="sm" className="w-full">
                    You're Going! ✓
                  </Button>
                ) : isFull ? (
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    Join Waitlist
                  </Button>
                ) : (
                  <Button size="sm" className="w-full">
                    Quick RSVP
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
