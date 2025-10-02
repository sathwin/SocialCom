'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { EventCard } from '@/components/events/EventCard';
import { useAppStore } from '@/store/useAppStore';
import { CATEGORIES } from '@/types';
import { Search, Sparkles, Users, Shield, Calendar, TrendingUp, Heart, Quote, Award, MapPin, Clock, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { events } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statsCount, setStatsCount] = useState({ events: 0, connections: 0 });

  // Featured events (first 4)
  const featuredEvents = events.slice(0, 4);

  // Animated stats counter
  useEffect(() => {
    const eventTarget = 2847;
    const connectionTarget = 12453;
    const duration = 2000;
    const steps = 60;
    const eventIncrement = eventTarget / steps;
    const connectionIncrement = connectionTarget / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setStatsCount({
        events: Math.min(Math.floor(eventIncrement * currentStep), eventTarget),
        connections: Math.min(Math.floor(connectionIncrement * currentStep), connectionTarget),
      });
      if (currentStep >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Hero Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl text-balance">
                Find Your People,{' '}
                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                  Your Way
                </span>
              </h1>
              <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Discover social events designed to reduce anxiety and foster genuine connections. Because everyone
                deserves to feel comfortable meeting new people.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto max-w-2xl"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search events or activities..."
                    className="pl-10 h-12 text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Link href={`/events${searchQuery ? `?q=${searchQuery}` : ''}`}>
                  <Button size="lg" className="w-full sm:w-auto h-12 px-8">
                    Explore Events
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center gap-12 pt-4"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{statsCount.events.toLocaleString()}</div>
                <div className="text-sm text-slate-600">Events Hosted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{statsCount.connections.toLocaleString()}</div>
                <div className="text-sm text-slate-600">Connections Made</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      </section>

      {/* Category Pills */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((category) => (
              <Link key={category} href={`/events?category=${encodeURIComponent(category)}`}>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-colors px-4 py-2 text-sm"
                >
                  {category}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-warm-gradient">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Featured Events</h2>
            <p className="mt-2 text-slate-600">Handpicked events happening soon</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/events">
              <Button size="lg" variant="outline">
                View All Events →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
            <p className="mt-2 text-slate-600">Getting started is easy</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: 'Discover Events',
                description: 'Browse events filtered by your interests and comfort level. See who else is attending before you commit.',
              },
              {
                icon: Calendar,
                title: 'RSVP with Confidence',
                description: 'Get ice breakers and event details upfront. Know exactly what to expect before you arrive.',
              },
              {
                icon: Users,
                title: 'Make Connections',
                description: 'Meet people in structured, anxiety-friendly environments. Build genuine friendships at your own pace.',
              },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center space-y-4"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light shadow-lg">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold text-slate-900">Built for Your Comfort</h2>
              </div>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Every event on SocialCom is designed with social anxiety in mind. We provide structured activities,
                  clear expectations, and conversation starters to help you feel at ease.
                </p>
                <ul className="space-y-3">
                  {[
                    'See mutual connections before attending',
                    'Filter by noise level and event structure',
                    'Ice breakers provided for every event',
                    'Newcomer-friendly badges on beginner events',
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/events">
                <Button size="lg">
                  Start Exploring
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800"
                  alt="People connecting"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 h-64 w-64 rounded-full bg-primary/10 blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Making Real Impact</h2>
            <p className="text-xl text-slate-600">Helping thousands overcome social anxiety, one event at a time</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, label: 'New Friendships', value: '1,247', subtitle: 'Made this month', color: 'text-primary' },
              { icon: Calendar, label: 'Events Hosted', value: '350+', subtitle: 'Across 15 cities', color: 'text-secondary' },
              { icon: Heart, label: 'Anxiety Reduced', value: '68%', subtitle: 'Average reported decrease', color: 'text-success' },
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <metric.icon className={`h-12 w-12 ${metric.color} mx-auto mb-4`} />
                <div className="text-4xl font-bold text-slate-900 mb-2">{metric.value}</div>
                <div className="text-lg font-semibold text-slate-700 mb-1">{metric.label}</div>
                <div className="text-sm text-slate-500">{metric.subtitle}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Stories Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Stories from Our Community</h2>
            <p className="text-xl text-slate-600">Real people, real connections, real change</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Alex Martinez',
                avatar: 'https://i.pravatar.cc/150?img=12',
                role: 'Software Engineer',
                quote: "I went from avoiding all social events to hosting my own hiking group. SocialCom showed me I wasn't alone in my anxiety.",
                achievement: 'Hosted 8 events',
              },
              {
                name: 'Jordan Park',
                avatar: 'https://i.pravatar.cc/150?img=45',
                role: 'Graphic Designer',
                quote: "The three-tier visibility was a game-changer. I could see who was going before committing, which made all the difference for my anxiety.",
                achievement: 'Made 12 new friends',
              },
              {
                name: 'Sam Rivera',
                avatar: 'https://i.pravatar.cc/150?img=33',
                role: 'Teacher',
                quote: "After moving to a new city, I was terrified to meet people. SocialCom's newcomer-friendly events helped me build my entire friend group.",
                achievement: 'Attended 15 events',
              },
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100"
              >
                <Quote className="h-10 w-10 text-primary/20 mb-4" />
                <p className="text-slate-700 mb-6 italic leading-relaxed">{story.quote}</p>
                <div className="flex items-center space-x-4 mb-4">
                  <img src={story.avatar} alt={story.name} className="h-14 w-14 rounded-full border-2 border-primary/20" />
                  <div>
                    <div className="font-semibold text-slate-900">{story.name}</div>
                    <div className="text-sm text-slate-500">{story.role}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-primary">
                  <Award className="h-4 w-4" />
                  <span className="font-medium">{story.achievement}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SocialCom Section */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose SocialCom?</h2>
            <p className="text-xl text-slate-600">Built differently, for people like you</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Privacy-First',
                description: 'Three-tier attendee visibility means you control what you share. See connections before committing, never feel exposed.',
                features: ['Progressive disclosure', 'Opt-in sharing', 'Your data, your rules'],
              },
              {
                icon: Heart,
                title: 'Anxiety-Friendly',
                description: 'Every feature designed to reduce anxiety. From noise filters to ice breakers, we make socializing comfortable.',
                features: ['Structured events', 'Clear expectations', 'Exit strategies'],
              },
              {
                icon: Users,
                title: 'Community-Driven',
                description: 'Real people hosting events for real connections. No algorithms pushing you to engage - just genuine community.',
                features: ['Local hosts', 'Recurring groups', 'Buddy system'],
              },
            ].map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <pillar.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{pillar.description}</p>
                <ul className="space-y-2">
                  {pillar.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-slate-600">
                      <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-white">Ready to Find Your Community?</h2>
            <p className="text-xl text-blue-100">
              Join thousands of people making meaningful connections in anxiety-friendly environments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/events">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Browse Events
                </Button>
              </Link>
              <Link href="/events/create">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white hover:bg-slate-50 text-primary border-white">
                  Create an Event
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
