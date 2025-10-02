'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import { CATEGORIES } from '@/types';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function EventFilters() {
  const { filters, updateFilters, resetFilters } = useAppStore();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: newCategories });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.newcomerFriendly ||
    filters.structured ||
    filters.quiet ||
    filters.searchQuery;

  return (
    <div className="sticky top-20 h-fit space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="h-5 w-5 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search events..."
            className="pl-9"
            value={filters.searchQuery}
            onChange={(e) => updateFilters({ searchQuery: e.target.value })}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700">Categories</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const isSelected = filters.categories.includes(category);
            return (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={cn(
                  'rounded-lg border px-3 py-1.5 text-sm font-medium transition-all hover:scale-102',
                  isSelected
                    ? 'border-primary bg-primary text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                )}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Anxiety-Friendly Filters */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700">Anxiety-Friendly Options</label>
        <div className="space-y-2">
          {[
            { key: 'newcomerFriendly', label: 'Newcomer friendly', emoji: '👋' },
            { key: 'structured', label: 'Structured activities', emoji: '📋' },
            { key: 'quiet', label: 'Quiet environment', emoji: '🤫' },
          ].map(({ key, label, emoji }) => (
            <label
              key={key}
              className="flex items-center space-x-3 cursor-pointer group hover:bg-slate-50 rounded-lg p-2 transition-colors"
            >
              <input
                type="checkbox"
                checked={filters[key as keyof typeof filters] as boolean}
                onChange={(e) => updateFilters({ [key]: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
              />
              <span className="flex-1 text-sm text-slate-700 group-hover:text-slate-900">
                {emoji} {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Location Radius */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700">
          Distance: {filters.locationRadius} miles
        </label>
        <input
          type="range"
          min="5"
          max="100"
          step="5"
          value={filters.locationRadius}
          onChange={(e) => updateFilters({ locationRadius: parseInt(e.target.value) })}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>5 mi</span>
          <span>100 mi</span>
        </div>
      </div>

      {/* Sort */}
      <div className="space-y-2 pt-4 border-t border-slate-200">
        <label className="text-sm font-medium text-slate-700">Sort by</label>
        <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
          <option>Upcoming</option>
          <option>Most Popular</option>
          <option>Near You</option>
          <option>Recently Added</option>
        </select>
      </div>
    </div>
  );
}
