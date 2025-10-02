'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/useAppStore';
import { Calendar, Users, TrendingUp, Sparkles, MapPin, Clock, ArrowRight } from 'lucide-react';
import { formatEventDateTime, getRelativeTime } from '@/lib/utils';
import { motion } from 'framer-motion';
import { format, isAfter, differenceInDays } from 'date-fns';

export default function DashboardPage() {
  const { userRSVPs, events, getEventById, getUserById, currentUser, connections } = useAppStore();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'hosting' | 'stats' | 'connections'>('upcoming');

  // Get user's upcoming events
  const upcomingEvents = useMemo(() => {
    return userRSVPs
      .map((rsvp) => getEventById(rsvp.eventId))
      .filter((event): event is NonNullable<typeof event> => event !== undefined)
      .filter((event) => isAfter(event.startDate, new Date()))
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }, [userRSVPs, getEventById]);

  // Get events hosted by user
  const hostedEvents = useMemo(() => {
    return events.filter((event) => event.hostId === currentUser?.id);
  }, [events, currentUser]);

  // Calculate stats
  const stats = useMemo(() => {
    const eventsAttended = userRSVPs.filter((rsvp) => {
      const event = getEventById(rsvp.eventId);
      return event && !isAfter(event.startDate, new Date());
    }).length;

    const userConnections = currentUser
      ? connections.filter(
          (conn) => conn.userAId === currentUser.id || conn.userBId === currentUser.id
        ).length
      : 0;

    // Calculate streak (mock - consecutive weeks with events)
    const streak = 3;

    return {
      eventsAttended,
      connections: userConnections,
      streak,
    };
  }, [userRSVPs, getEventById, currentUser, connections]);

  // Get user's connections
  const userConnections = useMemo(() => {
    if (!currentUser) return [];

    return connections
      .filter((conn) => conn.userAId === currentUser.id || conn.userBId === currentUser.id)
      .map((conn) => {
        const friendId = conn.userAId === currentUser.id ? conn.userBId : conn.userAId;
        const friend = getUserById(friendId);
        return friend ? { ...friend, eventsAttended: conn.eventsAttendedTogether } : null;
      })
      .filter((f): f is NonNullable<typeof f> => f !== null)
      .sort((a, b) => b.eventsAttended - a.eventsAttended);
  }, [currentUser, connections, getUserById]);

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', icon: Calendar, count: upcomingEvents.length },
    { id: 'hosting', label: 'Hosting', icon: Sparkles, count: hostedEvents.length },
    { id: 'stats', label: 'Stats', icon: TrendingUp },
    { id: 'connections', label: 'Connections', icon: Users, count: userConnections.length },
  ];

  return (
    <div className="min-h-screen bg-warm-gradient py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Dashboard</h1>
          <p className="mt-2 text-slate-600">Track your events and connections</p>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-slate-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <Badge variant={activeTab === tab.id ? 'default' : 'outline'} className="ml-1">
                      {tab.count}
                    </Badge>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Upcoming Events Tab */}
          {activeTab === 'upcoming' && (
            <div>
              {upcomingEvents.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                  <Calendar className="mx-auto h-16 w-16 text-slate-300 mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No upcoming events</h3>
                  <p className="text-slate-600 mb-6">Discover something new and make connections!</p>
                  <Link href="/events">
                    <Button>Explore Events</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => {
                    const daysUntil = differenceInDays(event.startDate, new Date());
                    const isComingSoon = daysUntil <= 3;

                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex space-x-4 flex-1">
                            <img
                              src={event.coverImage}
                              alt={event.title}
                              className="h-24 w-24 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <Link href={`/events/${event.id}`}>
                                    <h3 className="text-lg font-semibold text-slate-900 hover:text-primary transition-colors line-clamp-1">
                                      {event.title}
                                    </h3>
                                  </Link>
                                  <Badge variant="outline" className="mt-1">
                                    {event.category}
                                  </Badge>
                                </div>
                                {isComingSoon && (
                                  <Badge variant="secondary" className="ml-2 animate-pulse">
                                    Coming Soon!
                                  </Badge>
                                )}
                              </div>

                              <div className="space-y-1.5 text-sm text-slate-600">
                                <div className="flex items-center">
                                  <Calendar className="mr-1.5 h-4 w-4" />
                                  <span suppressHydrationWarning>{formatEventDateTime(event.startDate)}</span>
                                  <span className="ml-2 text-slate-500" suppressHydrationWarning>({getRelativeTime(event.startDate)})</span>
                                </div>
                                <div className="flex items-center">
                                  {event.locationType === 'in-person' ? (
                                    <>
                                      <MapPin className="mr-1.5 h-4 w-4" />
                                      <span className="truncate">{event.city}</span>
                                    </>
                                  ) : (
                                    <>
                                      <Clock className="mr-1.5 h-4 w-4" />
                                      <span>Virtual Event</span>
                                    </>
                                  )}
                                </div>
                                <div className="flex items-center">
                                  <Users className="mr-1.5 h-4 w-4" />
                                  <span>{event.currentAttendees} attending</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <Link href={`/events/${event.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Hosting Tab */}
          {activeTab === 'hosting' && (
            <div>
              {hostedEvents.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                  <Sparkles className="mx-auto h-16 w-16 text-slate-300 mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No hosted events</h3>
                  <p className="text-slate-600 mb-6">Create an event and bring people together!</p>
                  <Link href="/events/create">
                    <Button>Create Event</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {hostedEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
                          <p className="text-sm text-slate-600 mt-1" suppressHydrationWarning>{formatEventDateTime(event.startDate)}</p>
                          <div className="flex items-center space-x-4 mt-3">
                            <div className="flex items-center text-sm">
                              <Users className="mr-1.5 h-4 w-4 text-slate-600" />
                              <span className="font-medium text-slate-900">{event.currentAttendees}</span>
                              <span className="text-slate-600">/{event.maxCapacity} attending</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Manage Event
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">🎉</span>
                    <Calendar className="h-5 w-5 text-slate-400" />
                  </div>
                  <p className="text-3xl font-bold text-slate-900">{stats.eventsAttended}</p>
                  <p className="text-sm text-slate-600 mt-1">Events Attended</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">🤝</span>
                    <Users className="h-5 w-5 text-slate-400" />
                  </div>
                  <p className="text-3xl font-bold text-slate-900">{stats.connections}</p>
                  <p className="text-sm text-slate-600 mt-1">Connections Made</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">🔥</span>
                    <TrendingUp className="h-5 w-5 text-slate-400" />
                  </div>
                  <p className="text-3xl font-bold text-slate-900">{stats.streak}</p>
                  <p className="text-sm text-slate-600 mt-1">Week Streak</p>
                </motion.div>
              </div>

              {/* Activity Graph Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Activity</h3>
                <div className="h-48 flex items-center justify-center bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-500">Activity graph visualization would go here</p>
                </div>
              </motion.div>
            </div>
          )}

          {/* Connections Tab */}
          {activeTab === 'connections' && (
            <div>
              {userConnections.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                  <Users className="mx-auto h-16 w-16 text-slate-300 mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No connections yet</h3>
                  <p className="text-slate-600 mb-6">Attend events to meet amazing people!</p>
                  <Link href="/events">
                    <Button>Browse Events</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userConnections.map((connection) => (
                    <motion.div
                      key={connection.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="text-center">
                        <img
                          src={connection.avatar}
                          alt={connection.name}
                          className="h-20 w-20 rounded-full mx-auto mb-3"
                        />
                        <h3 className="font-semibold text-slate-900">{connection.name}</h3>
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">{connection.bio}</p>
                        <p className="text-xs text-primary font-medium mt-3">
                          Met at {connection.eventsAttended} {connection.eventsAttended === 1 ? 'event' : 'events'}
                        </p>
                        <div className="flex flex-wrap justify-center gap-1 mt-3">
                          {connection.interests.slice(0, 3).map((interest) => (
                            <Badge key={interest} variant="outline" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
