'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/types';
import { X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RSVPModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (status: 'going' | 'maybe' | 'interested', note: string) => void;
}

export function RSVPModal({ event, isOpen, onClose, onConfirm }: RSVPModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<'going' | 'maybe' | 'interested'>('going');
  const [note, setNote] = useState('');

  const handleConfirm = () => {
    onConfirm(selectedStatus, note);
    setNote('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md rounded-xl bg-white shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="pr-8">
                  <h2 className="text-2xl font-bold text-slate-900">Join {event.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    This event is{' '}
                    <Badge variant="outline" className="mx-1">
                      {event.eventStructure}
                    </Badge>{' '}
                    and{' '}
                    <Badge
                      variant={
                        event.noiseLevel === 'quiet'
                          ? 'quiet'
                          : event.noiseLevel === 'moderate'
                          ? 'moderate'
                          : 'lively'
                      }
                      className="mx-1"
                    >
                      {event.noiseLevel}
                    </Badge>
                  </p>
                </div>

                {/* RSVP Status */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Your response</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'going', label: 'Going', emoji: '✓' },
                      { value: 'maybe', label: 'Maybe', emoji: '?' },
                      { value: 'interested', label: 'Interested', emoji: '★' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedStatus(option.value as any)}
                        className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all hover:scale-102 ${
                          selectedStatus === option.value
                            ? 'border-primary bg-primary text-white shadow-md'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-lg mb-1">{option.emoji}</div>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Note */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Anything you want to share with the host? (optional)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="E.g., dietary restrictions, questions about the event..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 resize-none"
                    rows={3}
                  />
                </div>

                {/* Info Box */}
                <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                  <div className="flex items-start space-x-3">
                    <Sparkles className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      <p className="font-medium mb-1">Flexible cancellation</p>
                      <p className="text-blue-700">Cancel anytime up to 24 hours before the event starts.</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={onClose} className="flex-1">
                    Maybe Later
                  </Button>
                  <Button onClick={handleConfirm} className="flex-1">
                    Confirm RSVP
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
