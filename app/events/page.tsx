'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { EventCard } from '@/components/events/EventCard';
import { EventFilters } from '@/components/events/EventFilters';
import { useAppStore } from '@/store/useAppStore';
import { Event } from '@/types';
import { CalendarX } from 'lucide-react';
import { motion } from 'framer-motion';

function EventsContent() {
  const searchParams = useSearchParams();
  const { events, filters, updateFilters } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    const query = searchParams.get('q');

    if (category) {
      updateFilters({ categories: [category] });
    }
    if (query) {
      updateFilters({ searchQuery: query });
    }
  }, [searchParams, updateFilters]);

  // Filter events based on current filters
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesSearch =
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.category.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Categories
      if (filters.categories.length > 0 && !filters.categories.includes(event.category)) {
        return false;
      }

      // Newcomer friendly
      if (filters.newcomerFriendly && !event.newcomerFriendly) {
        return false;
      }

      // Structured
      if (filters.structured && event.eventStructure !== 'structured') {
        return false;
      }

      // Quiet
      if (filters.quiet && event.noiseLevel !== 'quiet') {
        return false;
      }

      return true;
    });
  }, [events, filters]);

  // Simulate loading when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <div className="min-h-screen bg-warm-gradient py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Browse Events</h1>
          <p className="mt-2 text-slate-600">
            Discover amazing events near you •{' '}
            <span className="font-medium text-primary">{filteredEvents.length} events</span> found
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-3">
            <EventFilters />
          </div>

          {/* Events Grid */}
          <div className="lg:col-span-9">
            {isLoading ? (
              // Loading Skeletons
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-pulse"
                  >
                    <div className="h-48 bg-slate-200" />
                    <div className="p-4 space-y-3">
                      <div className="h-6 bg-slate-200 rounded w-3/4" />
                      <div className="h-4 bg-slate-200 rounded w-1/2" />
                      <div className="h-4 bg-slate-200 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredEvents.length === 0 ? (
              // Empty State
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="rounded-full bg-slate-100 p-6 mb-6">
                  <CalendarX className="h-16 w-16 text-slate-400" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-2">No events found</h3>
                <p className="text-slate-600 max-w-md">
                  Try adjusting your filters or search query to discover more events.
                </p>
              </motion.div>
            ) : (
              // Events Grid
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <EventsContent />
    </Suspense>
  );
}
