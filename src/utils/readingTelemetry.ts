/**
 * Pure reading telemetry, calculation, and formatting logic for Bindnest
 */

export interface ReadingProgress {
  currentPage: number;
  totalPages: number;
  timeSpentMinutes: number;
}

export interface ReadingStreak {
  currentStreakDays: number;
  longestStreakDays: number;
  freezeDaysAvailable: number;
  isTodayCompleted: boolean;
}

/**
 * Calculates words per minute (WPM)
 */
export function calculateWpm(wordsRead: number, durationMinutes: number): number {
  if (durationMinutes <= 0 || wordsRead <= 0) return 0;
  return Math.round(wordsRead / durationMinutes);
}

/**
 * Calculates estimated minutes remaining for a book based on current velocity
 */
export function estimateMinutesRemaining(
  currentPage: number,
  totalPages: number,
  minutesPerPage: number = 1.1
): number {
  if (currentPage >= totalPages) return 0;
  const pagesLeft = totalPages - currentPage;
  return Math.max(0, Math.round(pagesLeft * minutesPerPage));
}

/**
 * Calculates percentage completion clamped between 0 and 100
 */
export function calculateProgressPercentage(current: number, total: number): number {
  if (total <= 0) return 0;
  const pct = Math.round((current / total) * 100);
  return Math.min(100, Math.max(0, pct));
}

/**
 * Calculates quarterly or monthly habit consistency percentage
 */
export function calculateConsistencyRate(activeDays: number, totalDays: number): number {
  if (totalDays <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((activeDays / totalDays) * 100)));
}

/**
 * Formats a duration in minutes into a human-friendly reading time string
 */
export function formatReadingDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = (minutes / 60).toFixed(1);
  return `${hours} hrs`;
}

/**
 * Cleanly truncates and formats a literary quote for social card preview
 */
export function formatQuoteForCard(quote: string, maxChars: number = 220): string {
  const cleaned = quote.trim().replace(/^["“]|["”]$/g, '');
  if (cleaned.length <= maxChars) {
    return `“${cleaned}”`;
  }
  return `“${cleaned.slice(0, maxChars).trim()}…”`;
}
