'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CATEGORIES } from '@/types';
import { Calendar, MapPin, Video, Plus, X, Sparkles, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CreateEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    locationType: 'in-person' as 'in-person' | 'virtual',
    address: '',
    virtualLink: '',
    date: '',
    time: '',
    duration: '60',
    maxCapacity: '20',
    eventStructure: 'mixed' as 'structured' | 'casual' | 'mixed',
    noiseLevel: 'moderate' as 'quiet' | 'moderate' | 'lively',
    newcomerFriendly: true,
    isRecurring: false,
    iceBreakers: ['', '', ''],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleIceBreakerChange = (index: number, value: string) => {
    const newIceBreakers = [...formData.iceBreakers];
    newIceBreakers[index] = value;
    setFormData((prev) => ({ ...prev, iceBreakers: newIceBreakers }));
  };

  const addIceBreaker = () => {
    setFormData((prev) => ({ ...prev, iceBreakers: [...prev.iceBreakers, ''] }));
  };

  const removeIceBreaker = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      iceBreakers: prev.iceBreakers.filter((_, i) => i !== index),
    }));
  };

  const generateIceBreakers = async () => {
    // Mock AI generation
    const mockIceBreakers = [
      "What brought you to this event today?",
      "What's your favorite thing about " + (formData.category || "this activity") + "?",
      "If you could learn any new skill instantly, what would it be?",
    ];

    setFormData((prev) => ({ ...prev, iceBreakers: mockIceBreakers }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';

    if (formData.locationType === 'in-person' && !formData.address) {
      newErrors.address = 'Address is required for in-person events';
    }
    if (formData.locationType === 'virtual' && !formData.virtualLink) {
      newErrors.virtualLink = 'Virtual link is required for virtual events';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Mock submission with delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert('Event created successfully! (This is a mock - no backend)');
    router.push('/events');
  };

  return (
    <div className="min-h-screen bg-warm-gradient py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Event</h1>
          <p className="text-slate-600 mb-8">Share your passion and bring people together</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-900">Basic Information</h2>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Event Title *</label>
                <Input
                  placeholder="E.g., Morning Hike at Mt. Tamalpais"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${errors.category ? 'border-red-500' : 'border-slate-300'}`}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description *</label>
                <textarea
                  placeholder="Tell people what to expect..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 resize-none ${errors.description ? 'border-red-500' : 'border-slate-300'}`}
                  rows={5}
                />
                {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
              </div>
            </section>

            {/* Date & Time */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-900">Date & Time</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date *</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className={errors.date ? 'border-red-500' : ''}
                  />
                  {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Time *</label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className={errors.time ? 'border-red-500' : ''}
                  />
                  {errors.time && <p className="text-sm text-red-500 mt-1">{errors.time}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Duration</label>
                <select
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                  <option value="180">3 hours</option>
                  <option value="240">4 hours</option>
                </select>
              </div>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isRecurring}
                  onChange={(e) => handleInputChange('isRecurring', e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
                <span className="text-sm text-slate-700">🔁 Make this recurring (Weekly)</span>
              </label>
            </section>

            {/* Location */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-900">Location</h2>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleInputChange('locationType', 'in-person')}
                  className={`flex-1 rounded-lg border-2 p-4 transition-all ${
                    formData.locationType === 'in-person'
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <MapPin className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <span className="block text-sm font-medium">In-Person</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('locationType', 'virtual')}
                  className={`flex-1 rounded-lg border-2 p-4 transition-all ${
                    formData.locationType === 'virtual'
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Video className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <span className="block text-sm font-medium">Virtual</span>
                </button>
              </div>

              {formData.locationType === 'in-person' ? (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Address *</label>
                  <Input
                    placeholder="123 Main St, San Francisco, CA"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={errors.address ? 'border-red-500' : ''}
                  />
                  {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Virtual Link *</label>
                  <Input
                    placeholder="https://zoom.us/j/..."
                    value={formData.virtualLink}
                    onChange={(e) => handleInputChange('virtualLink', e.target.value)}
                    className={errors.virtualLink ? 'border-red-500' : ''}
                  />
                  {errors.virtualLink && <p className="text-sm text-red-500 mt-1">{errors.virtualLink}</p>}
                </div>
              )}
            </section>

            {/* Capacity & Vibe */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-900">Capacity & Vibe</h2>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Max Capacity</label>
                <Input
                  type="number"
                  min="2"
                  max="1000"
                  value={formData.maxCapacity}
                  onChange={(e) => handleInputChange('maxCapacity', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Event Structure</label>
                <div className="grid grid-cols-3 gap-3">
                  {['structured', 'casual', 'mixed'].map((structure) => (
                    <button
                      key={structure}
                      type="button"
                      onClick={() => handleInputChange('eventStructure', structure)}
                      className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                        formData.eventStructure === structure
                          ? 'border-primary bg-primary text-white'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {structure.charAt(0).toUpperCase() + structure.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Noise Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'quiet', emoji: '🤫' },
                    { value: 'moderate', emoji: '💬' },
                    { value: 'lively', emoji: '🎉' },
                  ].map(({ value, emoji }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleInputChange('noiseLevel', value)}
                      className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                        formData.noiseLevel === value
                          ? 'border-primary bg-primary text-white'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {emoji} {value.charAt(0).toUpperCase() + value.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.newcomerFriendly}
                  onChange={(e) => handleInputChange('newcomerFriendly', e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
                <span className="text-sm text-slate-700">👋 Newcomer friendly</span>
              </label>
            </section>

            {/* Ice Breakers */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">Ice Breakers (Optional)</h2>
                <Button type="button" variant="outline" size="sm" onClick={generateIceBreakers}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate with AI
                </Button>
              </div>
              <p className="text-sm text-slate-600">Add 3-5 conversation starters to help attendees connect</p>

              <div className="space-y-3">
                {formData.iceBreakers.map((iceBreaker, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      placeholder={`Question ${index + 1}`}
                      value={iceBreaker}
                      onChange={(e) => handleIceBreakerChange(index, e.target.value)}
                    />
                    {formData.iceBreakers.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeIceBreaker(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {formData.iceBreakers.length < 5 && (
                <Button type="button" variant="outline" size="sm" onClick={addIceBreaker}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Another
                </Button>
              )}
            </section>

            {/* Actions */}
            <div className="flex space-x-4 pt-6 border-t border-slate-200">
              <Button type="button" variant="outline" onClick={() => router.push('/events')} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Publish Event
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
