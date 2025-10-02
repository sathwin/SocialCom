'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RSVPModal } from '@/components/events/RSVPModal';
import { useAppStore } from '@/store/useAppStore';
import {
  Calendar,
  MapPin,
  Video,
  Users,
  Clock,
  Share2,
  Download,
  ChevronRight,
  Sparkles,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Shield,
  TrendingUp,
  User,
  LogIn,
} from 'lucide-react';
import { formatEventDate, formatEventTime, calculateCapacityPercentage, isEventFull } from '@/lib/utils';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const {
    getEventById,
    getUserRSVPForEvent,
    addRSVP,
    cancelRSVP,
    getMutualConnectionsForEvent,
    getUserById,
    isLoggedIn,
    currentUser,
    users,
  } = useAppStore();

  const event = getEventById(eventId);
  const userRSVP = getUserRSVPForEvent(eventId);
  const mutualConnections = getMutualConnectionsForEvent(eventId);
  const host = event ? getUserById(event.hostId) : null;

  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);
  const [showIceBreakers, setShowIceBreakers] = useState(false);

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Event not found</h1>
          <p className="mt-2 text-slate-600">This event doesn&apos;t exist or has been removed.</p>
          <Link href="/events">
            <Button className="mt-4">Browse Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isFull = isEventFull(event.currentAttendees, event.maxCapacity);
  const capacityPercentage = calculateCapacityPercentage(event.currentAttendees, event.maxCapacity);
  const spotsLeft = event.maxCapacity - event.currentAttendees;

  const handleRSVPConfirm = (status: 'going' | 'maybe' | 'interested', note: string) => {
    addRSVP(eventId, status, note);
  };

  const handleCancelRSVP = () => {
    if (confirm('Are you sure you want to cancel your RSVP?')) {
      cancelRSVP(eventId);
    }
  };

  // Three-tier attendee visibility logic
  const getAttendeeDisplay = () => {
    // State A: Not Logged In
    if (!isLoggedIn) {
      return (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-slate-600" />
            <span className="text-lg font-semibold text-slate-900">{event.currentAttendees} people attending</span>
          </div>
          <Button onClick={() => router.push('/login')} className="w-full">
            <LogIn className="mr-2 h-4 w-4" />
            Login to see who&apos;s going
          </Button>
        </div>
      );
    }

    // State B: Logged In but No RSVP
    if (!userRSVP) {
      const firstTimers = Math.round(event.currentAttendees * 0.6);
      const regulars = event.currentAttendees - firstTimers;

      return (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold text-slate-900">
                {event.currentAttendees} attending{spotsLeft > 0 && ` (${spotsLeft} spots left!)`}
              </span>
            </div>

            {mutualConnections.length > 0 && (
              <div className="flex items-center space-x-2 text-primary mb-3">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">
                  {mutualConnections.length} of your connections {mutualConnections.length === 1 ? 'is' : 'are'}{' '}
                  going:{' '}
                  {mutualConnections
                    .slice(0, 3)
                    .map((c) => c.name.split(' ')[0])
                    .join(', ')}
                  {mutualConnections.length > 3 && ` and ${mutualConnections.length - 3} more`}
                </span>
              </div>
            )}

            <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
              <div className="flex items-start space-x-3 mb-3">
                <TrendingUp className="h-5 w-5 text-slate-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900 mb-1">Attendee mix</p>
                  <p className="text-sm text-slate-600">
                    {firstTimers} first-timers ({Math.round((firstTimers / event.currentAttendees) * 100)}%) •{' '}
                    {regulars} regulars ({Math.round((regulars / event.currentAttendees) * 100)}%)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button onClick={() => setIsRSVPModalOpen(true)} className="w-full" size="lg">
            RSVP to see full attendee list
          </Button>
        </div>
      );
    }

    // State C: RSVP'd - Show full list
    const attendees = event.attendeeIds
      .map((id) => getUserById(id))
      .filter((u) => u !== undefined)
      .filter((u) => u.showAttendance); // Respect privacy settings

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Who&apos;s Going ({attendees.length} {attendees.length === 1 ? 'person' : 'people'})
          </h3>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {attendees.map((attendee) => (
              <div
                key={attendee.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <img src={attendee.avatar} alt={attendee.name} className="h-12 w-12 rounded-full flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-slate-900">{attendee.name}</p>
                    {attendee.id === event.hostId && (
                      <Badge variant="secondary" className="text-xs">
                        Host
                      </Badge>
                    )}
                    {mutualConnections.some((c) => c.id === attendee.id) && (
                      <Badge variant="success" className="text-xs">
                        Connection
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">{attendee.bio}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {attendee.interests.slice(0, 3).map((interest) => (
                      <Badge key={interest} variant="outline" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-warm-gradient">
      {/* Hero Image */}
      <div className="relative h-96 w-full">
        <img src={event.coverImage} alt={event.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-0 right-0">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm text-white/90">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/events" className="hover:text-white">
                Events
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">{event.category}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg"
            >
              <Badge variant="default" className="mb-4">
                {event.category}
              </Badge>
              <h1 className="text-3xl font-bold text-slate-900 mb-4 text-balance">{event.title}</h1>

              {/* Host Info */}
              {host && (
                <div className="flex items-center space-x-3 text-sm text-slate-600">
                  <img src={host.avatar} alt={host.name} className="h-10 w-10 rounded-full" />
                  <div>
                    <p className="font-medium text-slate-900">Hosted by {host.name}</p>
                    <p className="text-slate-600">{host.city}</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg space-y-4"
            >
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-slate-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900" suppressHydrationWarning>{formatEventDate(event.startDate)}</p>
                  <p className="text-sm text-slate-600" suppressHydrationWarning>
                    {formatEventTime(event.startDate)} • {event.durationMinutes} minutes • {event.timezone}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                {event.locationType === 'in-person' ? (
                  <>
                    <MapPin className="h-5 w-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">In-Person</p>
                      <p className="text-sm text-slate-600">{event.address}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <Video className="h-5 w-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">Virtual Event</p>
                      <p className="text-sm text-slate-600">Link will be shared after RSVP</p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-slate-900 mb-4">About this event</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{event.description}</p>
            </motion.div>

            {/* Ice Breakers */}
            {event.iceBreakers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg"
              >
                <button
                  onClick={() => setShowIceBreakers(!showIceBreakers)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-slate-600" />
                    <h2 className="text-xl font-semibold text-slate-900">Conversation Starters</h2>
                  </div>
                  {showIceBreakers ? (
                    <ChevronUp className="h-5 w-5 text-slate-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-600" />
                  )}
                </button>

                {showIceBreakers && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-3"
                  >
                    {event.iceBreakers.map((iceBreaker, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50">
                        <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white text-sm font-medium">
                          {index + 1}
                        </span>
                        <p className="text-sm text-slate-700 pt-0.5">{iceBreaker}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Attendees - Three-Tier Visibility */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg"
            >
              {getAttendeeDisplay()}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 rounded-xl border border-slate-200 bg-white p-6 shadow-lg space-y-6"
            >
              {/* Capacity */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Capacity</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {event.currentAttendees}/{event.maxCapacity}
                  </span>
                </div>
                <div className="relative h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${capacityPercentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`absolute inset-y-0 left-0 rounded-full ${
                      capacityPercentage >= 100
                        ? 'bg-slate-400'
                        : capacityPercentage >= 80
                        ? 'bg-secondary'
                        : 'bg-success'
                    }`}
                  />
                </div>
                {spotsLeft > 0 && spotsLeft <= 5 && (
                  <p className="text-xs text-secondary font-medium mt-2">Only {spotsLeft} spots left!</p>
                )}
              </div>

              {/* Event Properties */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Structure</span>
                  <Badge variant="outline">{event.eventStructure}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Noise Level</span>
                  <Badge
                    variant={
                      event.noiseLevel === 'quiet'
                        ? 'quiet'
                        : event.noiseLevel === 'moderate'
                        ? 'moderate'
                        : 'lively'
                    }
                  >
                    {event.noiseLevel}
                  </Badge>
                </div>
                {event.newcomerFriendly && (
                  <div className="flex items-center space-x-2 text-sm text-success">
                    <Shield className="h-4 w-4" />
                    <span className="font-medium">Newcomer-friendly</span>
                  </div>
                )}
              </div>

              {/* RSVP Button */}
              {isLoggedIn ? (
                userRSVP ? (
                  <div className="space-y-2">
                    <Button variant="outline" size="lg" className="w-full" disabled>
                      You&apos;re Going! ✓
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full" onClick={handleCancelRSVP}>
                      Cancel RSVP
                    </Button>
                  </div>
                ) : isFull ? (
                  <Button variant="outline" size="lg" className="w-full" disabled>
                    Event Full - Join Waitlist
                  </Button>
                ) : (
                  <Button size="lg" className="w-full" onClick={() => setIsRSVPModalOpen(true)}>
                    RSVP Now
                  </Button>
                )
              ) : (
                <Button size="lg" className="w-full" onClick={() => router.push('/login')}>
                  Login to RSVP
                </Button>
              )}

              {/* Secondary Actions */}
              <div className="space-y-2 pt-4 border-t border-slate-200">
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Add to Calendar
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Event
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      <RSVPModal
        event={event}
        isOpen={isRSVPModalOpen}
        onClose={() => setIsRSVPModalOpen(false)}
        onConfirm={handleRSVPConfirm}
      />
    </div>
  );
}
