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
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-24 md:py-32">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/30 to-purple-400/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/30 to-pink-400/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-10">
            {/* Hero Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-white/20 mb-4">
                <Sparkles className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Anxiety-Friendly Social Platform
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-slate-900 leading-tight">
                Find Your People,{' '}
                <br className="hidden sm:block" />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                    Your Way
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary/20 via-purple-600/20 to-pink-600/20 blur-sm"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                      scaleX: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </span>
              </h1>

              <p className="mt-8 text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
                Discover social events designed to <span className="font-semibold text-slate-800">reduce anxiety</span> and foster{' '}
                <span className="font-semibold text-slate-800">genuine connections</span>.
                Because everyone deserves to feel comfortable meeting new people.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mx-auto max-w-3xl"
            >
              <div className="flex flex-col sm:flex-row gap-4 p-2 rounded-2xl bg-white/90 backdrop-blur-md shadow-2xl border border-white/20">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search for events, activities, or communities..."
                    className="pl-12 h-14 text-base border-0 bg-transparent focus:ring-0 focus-visible:ring-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Link href={`/events${searchQuery ? `?q=${searchQuery}` : ''}`}>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-14 px-10 bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Explore Now
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="relative inline-block">
                  <div className="text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    {statsCount.events.toLocaleString()}
                  </div>
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    layoutId="stats-glow"
                  />
                </div>
                <div className="text-sm font-medium text-slate-600 mt-2">Events Hosted</div>
              </motion.div>
              <div className="hidden md:block h-16 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="relative inline-block">
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {statsCount.connections.toLocaleString()}
                  </div>
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    layoutId="stats-glow-2"
                  />
                </div>
                <div className="text-sm font-medium text-slate-600 mt-2">Connections Made</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
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
      <section className="relative py-24 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50" />
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[size:60px_60px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-white/20">
                <TrendingUp className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">Our Impact</span>
              </div>
            </motion.div>
            <h2 className="text-5xl font-bold text-slate-900 mb-4">Making Real Impact</h2>
            <p className="text-xl text-slate-600">Helping thousands overcome social anxiety, one event at a time</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, label: 'New Friendships', value: '1,247', subtitle: 'Made this month', gradient: 'from-blue-500 to-primary' },
              { icon: Calendar, label: 'Events Hosted', value: '350+', subtitle: 'Across 15 cities', gradient: 'from-purple-500 to-pink-500' },
              { icon: Heart, label: 'Anxiety Reduced', value: '68%', subtitle: 'Average reported decrease', gradient: 'from-pink-500 to-rose-500' },
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative"
              >
                {/* Glassmorphism Card */}
                <div className="relative rounded-3xl p-8 text-center backdrop-blur-xl bg-white/70 border border-white/20 shadow-xl overflow-hidden">
                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  {/* Icon with Gradient Background */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} blur-2xl opacity-30 group-hover:opacity-50 transition-opacity`} />
                    <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-br ${metric.gradient}`}>
                      <metric.icon className="h-10 w-10 text-white" />
                    </div>
                  </div>

                  {/* Value with Gradient Text */}
                  <div className={`text-6xl font-bold bg-gradient-to-br ${metric.gradient} bg-clip-text text-transparent mb-3`}>
                    {metric.value}
                  </div>

                  <div className="text-xl font-semibold text-slate-800 mb-2">{metric.label}</div>
                  <div className="text-sm text-slate-600">{metric.subtitle}</div>

                  {/* Shine Effect */}
                  <div className="absolute top-0 -right-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:right-full transition-all duration-1000" />
                </div>

                {/* Glow Effect on Hover */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${metric.gradient} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Stories Section */}
      <section className="relative py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/20">
                <Heart className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Community Voices
                </span>
              </div>
            </motion.div>
            <h2 className="text-5xl font-bold text-slate-900 mb-4">Stories from Our Community</h2>
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
                color: 'from-blue-500 to-primary',
              },
              {
                name: 'Jordan Park',
                avatar: 'https://i.pravatar.cc/150?img=45',
                role: 'Graphic Designer',
                quote: "The three-tier visibility was a game-changer. I could see who was going before committing, which made all the difference for my anxiety.",
                achievement: 'Made 12 new friends',
                color: 'from-purple-500 to-pink-500',
              },
              {
                name: 'Sam Rivera',
                avatar: 'https://i.pravatar.cc/150?img=33',
                role: 'Teacher',
                quote: "After moving to a new city, I was terrified to meet people. SocialCom's newcomer-friendly events helped me build my entire friend group.",
                achievement: 'Attended 15 events',
                color: 'from-pink-500 to-rose-500',
              },
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group relative h-full"
              >
                {/* Card */}
                <div className="relative h-full rounded-3xl p-8 bg-white border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Gradient Border Effect on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${story.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  {/* Quote Icon */}
                  <div className="relative mb-6">
                    <Quote className={`h-12 w-12 text-transparent bg-gradient-to-br ${story.color} bg-clip-text opacity-20 group-hover:opacity-40 transition-opacity`} />
                  </div>

                  {/* Quote Text */}
                  <p className="relative text-slate-700 text-lg mb-8 italic leading-relaxed">
                    "{story.quote}"
                  </p>

                  {/* Author Section */}
                  <div className="relative flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${story.color} blur-lg opacity-0 group-hover:opacity-40 transition-opacity`} />
                      <img
                        src={story.avatar}
                        alt={story.name}
                        className={`relative h-16 w-16 rounded-full border-2 border-transparent bg-gradient-to-br ${story.color} p-0.5`}
                      />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-lg">{story.name}</div>
                      <div className="text-sm text-slate-500">{story.role}</div>
                    </div>
                  </div>

                  {/* Achievement Badge */}
                  <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${story.color} bg-opacity-10`}>
                    <Award className={`h-4 w-4 bg-gradient-to-br ${story.color} bg-clip-text text-transparent`} />
                    <span className={`text-sm font-semibold bg-gradient-to-r ${story.color} bg-clip-text text-transparent`}>
                      {story.achievement}
                    </span>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute top-0 -right-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:right-full transition-all duration-1000" />
                </div>

                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${story.color} rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`} />
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
