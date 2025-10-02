'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/useAppStore';
import { INTERESTS } from '@/types';
import { User, MapPin, Edit, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, isLoggedIn } = useAppStore();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    bio: currentUser?.bio || '',
    city: currentUser?.city || '',
    interests: currentUser?.interests || [],
    profileVisibility: currentUser?.profileVisibility || 'public',
    showAttendance: currentUser?.showAttendance ?? true,
  });

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSave = () => {
    // Mock save - in real app would update store
    alert('Profile updated! (This is a mock - changes not persisted)');
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (!currentUser) return;
    setFormData({
      name: currentUser.name,
      bio: currentUser.bio,
      city: currentUser.city,
      interests: currentUser.interests,
      profileVisibility: currentUser.profileVisibility,
      showAttendance: currentUser.showAttendance,
    });
    setIsEditing(false);
  };

  if (!isLoggedIn || !currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Please log in</h1>
          <p className="mt-2 text-slate-600">You need to be logged in to view your profile</p>
          <Button className="mt-4" onClick={() => router.push('/')}>
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-gradient py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="relative h-32 bg-gradient-to-r from-primary to-primary-light">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white border-2 border-slate-200 shadow-lg hover:bg-slate-50 transition-colors">
                  <Edit className="h-4 w-4 text-slate-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                {isEditing ? (
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="text-2xl font-bold mb-2"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-slate-900">{currentUser.name}</h1>
                )}
                <div className="flex items-center text-slate-600 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {isEditing ? (
                    <Input
                      value={formData.city}
                      onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                      className="text-sm w-48"
                    />
                  ) : (
                    <span className="text-sm">{currentUser.city}</span>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="mr-1 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Check className="mr-1 h-4 w-4" />
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="mr-1 h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-slate-900 mb-2">About</h2>
              {isEditing ? (
                <div>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                    maxLength={200}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 resize-none"
                    rows={4}
                  />
                  <p className="text-xs text-slate-500 mt-1">{formData.bio.length}/200 characters</p>
                </div>
              ) : (
                <p className="text-slate-600 leading-relaxed">{currentUser.bio}</p>
              )}
            </div>

            {/* Interests */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-slate-900 mb-3">Interests</h2>
              {isEditing ? (
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((interest) => {
                    const isSelected = formData.interests.includes(interest);
                    return (
                      <button
                        key={interest}
                        onClick={() => handleInterestToggle(interest)}
                        className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-all hover:scale-102 ${
                          isSelected
                            ? 'border-primary bg-primary text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {currentUser.interests.map((interest) => (
                    <Badge key={interest} variant="outline">
                      {interest}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Privacy Settings */}
            <div className="border-t border-slate-200 pt-8">
              <h2 className="text-sm font-semibold text-slate-900 mb-4">Privacy Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Profile Visibility</label>
                  {isEditing ? (
                    <select
                      value={formData.profileVisibility}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          profileVisibility: e.target.value as 'public' | 'connections' | 'private',
                        }))
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <option value="public">Public - Anyone can see my profile</option>
                      <option value="connections">Connections Only - Only people I&apos;ve met can see my profile</option>
                      <option value="private">Private - My profile is hidden</option>
                    </select>
                  ) : (
                    <div className="text-sm text-slate-600">
                      {currentUser.profileVisibility === 'public' && 'Public - Anyone can see your profile'}
                      {currentUser.profileVisibility === 'connections' &&
                        "Connections Only - Only people you've met can see your profile"}
                      {currentUser.profileVisibility === 'private' && 'Private - Your profile is hidden'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={isEditing ? formData.showAttendance : currentUser.showAttendance}
                      onChange={(e) =>
                        isEditing && setFormData((prev) => ({ ...prev, showAttendance: e.target.checked }))
                      }
                      disabled={!isEditing}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                        Show my attendance on events
                      </span>
                      <p className="text-xs text-slate-500 mt-1">
                        When enabled, other attendees can see you&apos;re going to the same events
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="border-t border-slate-200 pt-8 mt-8">
              <h2 className="text-sm font-semibold text-slate-900 mb-4">Your Activity</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-slate-50">
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-xs text-slate-600 mt-1">Events Attended</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-slate-50">
                  <p className="text-2xl font-bold text-primary">23</p>
                  <p className="text-xs text-slate-600 mt-1">Connections</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-slate-50">
                  <p className="text-2xl font-bold text-primary">3</p>
                  <p className="text-xs text-slate-600 mt-1">Events Hosted</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
