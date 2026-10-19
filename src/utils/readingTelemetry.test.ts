import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateWpm,
  estimateMinutesRemaining,
  calculateProgressPercentage,
  calculateConsistencyRate,
  formatReadingDuration,
  formatQuoteForCard,
} from './readingTelemetry.ts';

test('calculateWpm accurately calculates words per minute', () => {
  assert.equal(calculateWpm(2450, 10), 245);
  assert.equal(calculateWpm(0, 15), 0);
  assert.equal(calculateWpm(500, 0), 0);
  assert.equal(calculateWpm(-100, 10), 0);
});

test('estimateMinutesRemaining calculates correct remaining time', () => {
  // 416 - 274 = 142 pages * 1.1 = 156.2 => 156
  assert.equal(estimateMinutesRemaining(274, 416, 1.1), 156);
  // Finished book
  assert.equal(estimateMinutesRemaining(416, 416, 1.1), 0);
  // Past finish
  assert.equal(estimateMinutesRemaining(500, 416, 1.1), 0);
});

test('calculateProgressPercentage clamps properly between 0 and 100', () => {
  assert.equal(calculateProgressPercentage(274, 416), 66);
  assert.equal(calculateProgressPercentage(0, 416), 0);
  assert.equal(calculateProgressPercentage(416, 416), 100);
  assert.equal(calculateProgressPercentage(500, 416), 100);
  assert.equal(calculateProgressPercentage(-10, 416), 0);
});

test('calculateConsistencyRate calculates habit percentage accurately', () => {
  assert.equal(calculateConsistencyRate(14, 30), 47);
  assert.equal(calculateConsistencyRate(85, 100), 85);
  assert.equal(calculateConsistencyRate(0, 30), 0);
});

test('formatReadingDuration formats minutes into clean strings', () => {
  assert.equal(formatReadingDuration(34), '34m');
  assert.equal(formatReadingDuration(60), '1.0 hrs');
  assert.equal(formatReadingDuration(1104), '18.4 hrs');
});

test('formatQuoteForCard handles quotes and trims properly', () => {
  const shortQuote = 'To allow yourself to play with another person is no small risk.';
  assert.equal(
    formatQuoteForCard(shortQuote, 100),
    '“To allow yourself to play with another person is no small risk.”'
  );

  const longQuote = 'A'.repeat(250);
  const truncated = formatQuoteForCard(longQuote, 50);
  assert.equal(truncated.length, 53); // 50 + opening/closing quote & ellipsis
  assert.ok(truncated.endsWith('…”'));
});
