import React, { useState } from 'react';
import { ViewType, MilestoneBadgeData } from '../types.ts';
import { MOCK_MILESTONES } from '../data/mockData.ts';
import {
  calculateProgressPercentage,
  formatReadingDuration,
  calculateConsistencyRate,
} from '../utils/readingTelemetry.ts';

interface StatsStreaksViewProps {
  onNavigate: (view: ViewType) => void;
  onOpenShareModal: (quote?: string, book?: string, author?: string) => void;
}

export const StatsStreaksView: React.FC<StatsStreaksViewProps> = ({ onNavigate, onOpenShareModal }) => {
  const [currentStreak, setCurrentStreak] = useState(14);
  const [todayMinutes, setTodayMinutes] = useState(34);
  const dailyGoalMinutes = 45;
  const [selectedWeek, setSelectedWeek] = useState('Current Week');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Quick session logger state
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [logPages, setLogPages] = useState('25');
  const [logMinutes, setLogMinutes] = useState('30');
  const [logBook, setLogBook] = useState('Tomorrow, and Tomorrow, and Tomorrow');

  // Weekly bar data
  const [weeklyData, setWeeklyData] = useState([
    { day: 'Mon', minutes: 45, pages: 32, label: '45m' },
    { day: 'Tue', minutes: 60, pages: 48, label: '1h' },
    { day: 'Wed', minutes: 30, pages: 22, label: '30m' },
    { day: 'Thu', minutes: 55, pages: 40, label: '55m' },
    { day: 'Fri', minutes: 75, pages: 58, label: '1h 15m' },
    { day: 'Sat', minutes: 90, pages: 72, label: '1h 30m' },
    { day: 'Sun', minutes: todayMinutes, pages: 28, label: `${todayMinutes}m` },
  ]);

  // 5-week density heatmap
  // 5 weeks x 7 days (values 0 to 4 intensity)
  const heatmapData = [
    [2, 3, 4, 1, 3, 4, 3],
    [3, 2, 4, 4, 2, 4, 4],
    [1, 3, 2, 4, 3, 4, 2],
    [3, 4, 4, 3, 4, 4, 4],
    [4, 3, 4, 4, 3, 4, 2], // Current week
  ];

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogSession = (e: React.FormEvent) => {
    e.preventDefault();
    const addedMin = parseInt(logMinutes) || 0;
    const nextToday = todayMinutes + addedMin;
    setTodayMinutes(nextToday);
    
    // Update sunday
    setWeeklyData(prev => {
      const next = [...prev];
      next[6] = {
        ...next[6],
        minutes: nextToday,
        pages: next[6].pages + (parseInt(logPages) || 0),
        label: `${nextToday}m`
      };
      return next;
    });

    if (nextToday >= dailyGoalMinutes && todayMinutes < dailyGoalMinutes) {
      showToast('🎉 Daily reading goal achieved! Streak secured!');
    } else {
      showToast(`Logged ${logPages} pages (${addedMin} mins) for "${logBook}"`);
    }

    setIsLogModalOpen(false);
  };

  const goalPercent = Math.min(100, Math.round((todayMinutes / dailyGoalMinutes) * 100));
  const minutesRemaining = Math.max(0, dailyGoalMinutes - todayMinutes);

  return (
    <div className="min-w-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2d221c] text-[#f7efe6] px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-[#48372d] animate-fade-in">
          <span className="material-symbols-outlined text-[#e37f48] text-sm">auto_stories</span>
          <span className="text-sm font-sans font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#281b12] via-[#3d2719] to-[#1c120a] text-[#fdfaf7] p-8 md:p-12 shadow-xl border border-[#4a3222]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e37f48]/20 border border-[#e37f48]/30 text-[#e37f48] text-xs font-semibold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">query_stats</span>
              Weekly Rhythm & Long-term Telemetry
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#faf3ea] tracking-tight">
              Habits & Telemetry Sanctuary
            </h1>
            <p className="text-sm md:text-base font-serif italic text-[#d8c5b5] leading-relaxed">
              Quiet measurement of your literary cadence. Honoring consistency over hustle, celebrating sustained immersion across pages, chapters, and seasons.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => setIsLogModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-[#e37f48] text-[#1c120c] font-sans font-bold text-xs uppercase tracking-wider hover:bg-[#eb9260] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span className="material-symbols-outlined text-base">timer</span>
              Log Reading Session
            </button>
            <button
              onClick={() => onOpenShareModal(`"Reading is the only means of thinking with another person's brain." — 14-day streak active in Bindnest`, 'Bindnest Reading Journey', 'Maya Audina')}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-[#fdfaf7] border border-white/10 font-serif font-medium text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span className="material-symbols-outlined text-base">share</span>
              Share Streak Card
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid: Streak & Heatmap (Left) + Goal Ring Gauge (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: 14-Day Streak Showcase & 5-Week Activity Heatmap */}
        <div className="lg:col-span-7 space-y-6">
          {/* 14-Day Streak Showcase */}
          <div className="bg-[#fcf8f3] dark:bg-[#251e18] p-6 sm:p-8 rounded-2xl border border-[#ece1d4] dark:border-[#3d3128] shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#7e370d] dark:text-[#e37f48] font-bold">
                Unbroken Rhythm
              </span>
              <span className="text-xs text-[#857366] font-sans">Personal Record: 31 Days</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7e370d] to-[#b35222] text-white flex items-center justify-center shadow-md shrink-0">
                <span className="material-symbols-outlined text-3xl">local_fire_department</span>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-serif font-bold text-[#2d221c] dark:text-[#f8eee5]">
                    {currentStreak}
                  </span>
                  <span className="text-lg font-serif font-medium text-[#7a685b] dark:text-[#bdaaa0]">
                    Days Unbroken
                  </span>
                </div>
                <p className="text-xs font-serif italic text-[#857366] dark:text-[#a89689] mt-0.5">
                  You've opened your sanctuary every day since October 4th.
                </p>
              </div>
            </div>

            {/* Streak dots for last 14 days */}
            <div className="mt-6 pt-6 border-t border-[#ede3d8] dark:border-[#382d25]">
              <span className="text-xs font-semibold text-[#857366] block mb-2.5">
                Past 14 Days Telemetry Sequence
              </span>
              <div className="grid grid-cols-14 gap-1.5 sm:gap-2">
                {Array.from({ length: 14 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-8 rounded-md bg-[#7e370d] text-white flex items-center justify-center text-[10px] font-mono shadow-xs"
                    title={`Day ${idx + 1}: Goal completed`}
                  >
                    ✓
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5-Week Activity Density Heatmap */}
          <div className="bg-[#fcf8f3] dark:bg-[#251e18] p-6 sm:p-8 rounded-2xl border border-[#ece1d4] dark:border-[#3d3128] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-[#2d221c] dark:text-[#f8eee5]">
                  5-Week Activity Density Matrix
                </h3>
                <p className="text-xs font-serif italic text-[#857366]">
                  Daily volume visualized across weekly tidal cycles
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[#857366] font-mono">
                <span>Quiet</span>
                <span className="w-3 h-3 rounded-xs bg-[#f2e7dc] dark:bg-[#342921] inline-block" />
                <span className="w-3 h-3 rounded-xs bg-[#e0b9a3] inline-block" />
                <span className="w-3 h-3 rounded-xs bg-[#b86134] inline-block" />
                <span className="w-3 h-3 rounded-xs bg-[#7e370d] inline-block" />
                <span>Deep</span>
              </div>
            </div>

            {/* Heatmap Grid */}
            <div className="space-y-2">
              <div className="grid grid-cols-8 gap-2 text-center text-xs font-mono text-[#857366]">
                <span className="text-left font-serif text-[11px]">Week</span>
                {daysOfWeek.map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
              </div>

              {heatmapData.map((week, wIdx) => (
                <div key={wIdx} className="grid grid-cols-8 gap-2 items-center">
                  <span className="text-[11px] font-mono text-[#857366]">
                    W{wIdx + 1}
                  </span>
                  {week.map((val, dIdx) => {
                    const colorClass =
                      val === 0
                        ? 'bg-[#f0e5d8] dark:bg-[#342921]'
                        : val === 1
                        ? 'bg-[#e4cbbe] dark:bg-[#4a3427]'
                        : val === 2
                        ? 'bg-[#d69d7b]'
                        : val === 3
                        ? 'bg-[#b86134]'
                        : 'bg-[#7e370d]';
                    return (
                      <div
                        key={dIdx}
                        className={`h-7 rounded-md ${colorClass} transition-transform hover:scale-110 cursor-pointer shadow-xs`}
                        title={`Week ${wIdx + 1}, Day ${dIdx + 1}: Intensity level ${val}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Daily Goal Gauge & Weekly Bar Chart */}
        <div className="lg:col-span-5 space-y-6">
          {/* Daily Goal Gauge Ring */}
          <div className="bg-[#fcf8f3] dark:bg-[#251e18] p-6 sm:p-8 rounded-2xl border border-[#ece1d4] dark:border-[#3d3128] shadow-xs text-center space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#7e370d] dark:text-[#e37f48] font-bold">
                Daily Flow Cadence
              </span>
              <span className="text-xs text-[#857366] font-sans">Goal: {dailyGoalMinutes} min/day</span>
            </div>

            {/* Circular Gauge Graphic (SVG) */}
            <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background track */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-[#ede0d2] dark:stroke-[#3b2e25]"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Progress bar */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-[#7e370d] dark:stroke-[#e37f48] transition-all duration-700 ease-out"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - goalPercent / 100)}`}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-serif font-bold text-[#2d221c] dark:text-[#f8eee5]">
                  {todayMinutes}m
                </span>
                <span className="text-xs font-sans text-[#857366]">of {dailyGoalMinutes}m goal</span>
                <span className="text-xs font-mono font-bold text-[#7e370d] dark:text-[#e37f48] mt-1">
                  {goalPercent}%
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-[#2e231c] border border-[#e8dfd5] dark:border-[#3e3128]">
              {minutesRemaining > 0 ? (
                <div className="text-xs font-sans text-[#7a685b] dark:text-[#bdaaa0]">
                  ⏳ <strong>{minutesRemaining} minutes remaining</strong> today to preserve your 14-day streak.
                </div>
              ) : (
                <div className="text-xs font-sans text-emerald-700 dark:text-emerald-400 font-bold">
                  ✨ Daily sanctuary target achieved! Streak safely extended.
                </div>
              )}
            </div>
          </div>

          {/* Reading Velocity Bar Chart */}
          <div className="bg-[#fcf8f3] dark:bg-[#251e18] p-6 sm:p-8 rounded-2xl border border-[#ece1d4] dark:border-[#3d3128] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-[#2d221c] dark:text-[#f8eee5]">
                  Weekly Minutes Accumulation
                </h3>
                <p className="text-xs text-[#857366] font-serif italic">Mon - Sun time distribution</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#7e370d]">
                {weeklyData.reduce((acc, d) => acc + d.minutes, 0)}m total
              </span>
            </div>

            {/* Vertical Bar chart */}
            <div className="h-40 flex items-end justify-between gap-2 pt-6">
              {weeklyData.map((item, idx) => {
                const maxVal = 90;
                const heightPercent = Math.min(100, Math.round((item.minutes / maxVal) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-mono text-[#857366] opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.label}
                    </span>
                    <div className="w-full bg-[#f0e4d7] dark:bg-[#342921] rounded-t-md h-32 flex items-end">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-md transition-all duration-500 ${
                          idx === 6 ? 'bg-[#e37f48]' : 'bg-[#7e370d]'
                        }`}
                      />
                    </div>
                    <span className="text-xs font-mono text-[#544337] dark:text-[#c4b3a5]">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2x2 Telemetry Metric Highlights */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Pages Cataloged', value: '4,892', icon: 'auto_stories', sub: '+312 this month' },
          { label: 'Reading Velocity', value: '44 pgs/hr', icon: 'speed', sub: 'Calm reflective pace' },
          { label: 'Deep Focus Sanctuary', value: '68.4 hrs', icon: 'hourglass_top', sub: 'Camera-off flow' },
          { label: 'Rhythm Consistency', value: '86%', icon: 'insights', sub: 'Unbroken daily rhythm' },
        ].map((m, idx) => (
          <div
            key={idx}
            className="bg-[#fcf8f3] dark:bg-[#251e18] p-6 rounded-2xl border border-[#ece1d4] dark:border-[#3d3128] shadow-xs space-y-2"
          >
            <div className="flex items-center justify-between text-[#7e370d] dark:text-[#e37f48]">
              <span className="material-symbols-outlined text-2xl">{m.icon}</span>
              <span className="text-[11px] font-mono bg-[#7e370d]/10 px-2 py-0.5 rounded-md font-bold">
                {m.sub}
              </span>
            </div>
            <div className="text-2xl md:text-3xl font-serif font-bold text-[#2d221c] dark:text-[#f8eee5]">
              {m.value}
            </div>
            <div className="text-xs font-sans text-[#857366] dark:text-[#a89689]">
              {m.label}
            </div>
          </div>
        ))}
      </section>

      {/* Milestone Badges Shelf */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#2d221c] dark:text-[#f8eee5]">
              Literary Milestones & Quiet Honors
            </h2>
            <p className="text-sm font-serif italic text-[#7a685b] dark:text-[#bdaaa0]">
              Sanctuary insignias earned through persistent reflection and companionship
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_MILESTONES.map(badge => (
            <div
              key={badge.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                badge.isUnlocked
                  ? 'bg-white dark:bg-[#251e18] border-[#e8ded3] dark:border-[#3d3128] shadow-xs'
                  : 'bg-[#f7efe6]/60 dark:bg-[#1f1914] border-dashed border-[#ddd0c2] dark:border-[#362a22] opacity-75'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    badge.isUnlocked
                      ? 'bg-[#7e370d] text-white shadow-sm'
                      : 'bg-[#e5d8cc] dark:bg-[#342820] text-[#8e7d70]'
                  }`}>
                    <span className="material-symbols-outlined text-2xl">{badge.icon}</span>
                  </div>
                  {badge.isUnlocked ? (
                    <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 px-2.5 py-1 rounded-full">
                      {badge.unlockedAt || badge.unlockedDate || 'Unlocked'}
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-bold text-[#8e7d70] bg-[#e5d8cc] dark:bg-[#342820] px-2.5 py-1 rounded-full">
                      In Progress
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-serif font-bold text-base text-[#2d221c] dark:text-[#f8eee5]">
                    {badge.title}
                  </h3>
                  <p className="text-xs font-serif italic text-[#6a5648] dark:text-[#bdaaa0] mt-1">
                    {badge.description}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="pt-4 mt-4 border-t border-[#f0e6dc] dark:border-[#362b22] space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#857366]">
                  <span>Progress</span>
                  <span>{badge.currentProgress ?? badge.current ?? 0} / {badge.targetProgress ?? badge.target ?? 100}</span>
                </div>
                <div className="w-full bg-[#ede0d2] dark:bg-[#32261e] h-2 rounded-full overflow-hidden">
                  <div
                    style={{
                      width: `${Math.min(
                        100,
                        (((badge.currentProgress ?? badge.current ?? 0) /
                          (badge.targetProgress ?? badge.target ?? 100)) *
                          100)
                      )}%`
                    }}
                    className={`h-full rounded-full ${
                      badge.isUnlocked ? 'bg-emerald-600' : 'bg-[#7e370d]'
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Log Reading Session Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#fcf8f3] dark:bg-[#251e18] w-full max-w-md rounded-2xl border border-[#ede3d8] dark:border-[#3d3128] shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-[#2d221c] dark:text-[#f8eee5] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7e370d]">auto_stories</span>
                Log Reading Session
              </h3>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="p-1 rounded-lg text-[#857366] hover:bg-[#ede0d2] cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleLogSession} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#6d5747] dark:text-[#c4b3a5] mb-1">
                  Book Title
                </label>
                <select
                  value={logBook}
                  onChange={e => setLogBook(e.target.value)}
                  className="w-full text-xs font-serif bg-white dark:bg-[#2e231c] border border-[#dcd0c3] dark:border-[#423429] rounded-xl p-3 text-[#2d221c] dark:text-[#f8eee5] focus:outline-hidden"
                >
                  <option value="Tomorrow, and Tomorrow, and Tomorrow">Tomorrow, and Tomorrow, and Tomorrow</option>
                  <option value="Piranesi">Piranesi</option>
                  <option value="Klara and the Sun">Klara and the Sun</option>
                  <option value="Sea of Tranquility">Sea of Tranquility</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#6d5747] dark:text-[#c4b3a5] mb-1">
                    Pages Read
                  </label>
                  <input
                    type="number"
                    value={logPages}
                    onChange={e => setLogPages(e.target.value)}
                    className="w-full text-sm font-mono bg-white dark:bg-[#2e231c] border border-[#dcd0c3] dark:border-[#423429] rounded-xl p-3 text-[#2d221c] dark:text-[#f8eee5] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6d5747] dark:text-[#c4b3a5] mb-1">
                    Minutes Spent
                  </label>
                  <input
                    type="number"
                    value={logMinutes}
                    onChange={e => setLogMinutes(e.target.value)}
                    className="w-full text-sm font-mono bg-white dark:bg-[#2e231c] border border-[#dcd0c3] dark:border-[#423429] rounded-xl p-3 text-[#2d221c] dark:text-[#f8eee5] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 py-2 text-xs font-serif text-[#7a685b] hover:text-[#2d221c] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#7e370d] text-white text-xs font-sans font-bold hover:bg-[#682c09] transition-all cursor-pointer shadow-sm"
                >
                  Confirm & Update Telemetry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
