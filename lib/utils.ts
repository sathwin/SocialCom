import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistance, formatRelative, isAfter, isBefore, addDays } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEventDate(date: Date): string {
  const now = new Date();
  const daysDiff = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysDiff === 0) return 'Today';
  if (daysDiff === 1) return 'Tomorrow';
  if (daysDiff < 7) return format(date, 'EEEE'); // Day name
  if (daysDiff < 30) return format(date, 'MMM d'); // Month Day
  return format(date, 'MMM d, yyyy'); // Full date
}

export function formatEventTime(date: Date): string {
  return format(date, 'h:mm a');
}

export function formatEventDateTime(date: Date): string {
  return `${formatEventDate(date)} • ${formatEventTime(date)}`;
}

export function getRelativeTime(date: Date): string {
  return formatDistance(date, new Date(), { addSuffix: true });
}

export function getMutualConnections(
  userId: string,
  eventAttendeeIds: string[],
  connections: { userAId: string; userBId: string }[]
): string[] {
  const mutualIds = eventAttendeeIds.filter((attendeeId) => {
    return connections.some(
      (conn) =>
        (conn.userAId === userId && conn.userBId === attendeeId) ||
        (conn.userBId === userId && conn.userAId === attendeeId)
    );
  });
  return mutualIds;
}

export function calculateCapacityPercentage(current: number, max: number): number {
  return Math.round((current / max) * 100);
}

export function isEventAlmostFull(current: number, max: number): boolean {
  return calculateCapacityPercentage(current, max) >= 80;
}

export function isEventFull(current: number, max: number): boolean {
  return current >= max;
}

export function simulateAsyncDelay(ms: number = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getRandomItemFromArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
