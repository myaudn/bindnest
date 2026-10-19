import React, { useState } from 'react';
import { Book, Quote, FriendSession, ViewType } from '../types.ts';

interface DashboardViewProps {
  onNavigate: (view: ViewType) => void;
  onOpenShareModal: (quote?: string, book?: string, author?: string) => void;
  books: Book[];
  quotes: Quote[];
  onAddQuote: (newQuote: Quote) => void;
  friends: FriendSession[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenShareModal,
  books,
  quotes,
  onAddQuote,
  friends,
}) => {
  const [shelfTab, setShelfTab] = useState<'reading' | 'want' | 'finished'>('reading');
  const [quickThought, setQuickThought] = useState('');
  const [cheerFeedback, setCheerFeedback] = useState<string | null>(null);
  const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);

  const filteredBooks = books.filter((b) => {
    if (shelfTab === 'reading') return b.status === 'reading';
    if (shelfTab === 'want') return b.status === 'want';
    return b.status === 'finished';
  });

  const handleSendCheer = (name: string) => {
    setCheerFeedback(`Sent cheer & coffee emoji to ${name}! ☕✨`);
    setTimeout(() => setCheerFeedback(null), 2500);
  };

  const handleAddThought = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickThought.trim()) return;
    const newQ: Quote = {
      id: `q-${Date.now()}`,
      text: quickThought.trim(),
      bookTitle: 'Tomorrow, and Tomorrow, and Tomorrow',
      author: 'Clara Oswald Note',
      page: 274,
      likes: 1,
    };
    onAddQuote(newQ);
    setQuickThought('');
  };

  const copyQuoteToClipboard = (q: Quote) => {
    navigator.clipboard.writeText(`"${q.text}" — ${q.bookTitle} (${q.author})`);
    setCopiedQuoteId(q.id);
    setTimeout(() => setCopiedQuoteId(null), 2000);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1280px] w-full mx-auto px-4 lg:px-12 py-6 flex flex-col gap-8">
        {/* Top Welcome Greeting & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs text-secondary uppercase tracking-widest font-semibold">
                Afternoon Coffee & Pages
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-on-surface tracking-tight font-normal">
              Welcome back, Clara.
            </h1>
            <p className="text-sm md:text-base text-on-surface-variant mt-1">
              Your literary nook is calm, steeped, and ready. 34 minutes logged this morning.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onNavigate('stats-streaks')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface text-sm font-semibold transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Log Reading Session</span>
            </button>
            <button
              onClick={() => onNavigate('reader')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-sm font-semibold transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">auto_stories</span>
              <span>Open Reader</span>
            </button>
          </div>
        </div>

        {/* Cheer Toast */}
        {cheerFeedback && (
          <div className="bg-secondary-container text-on-secondary-container px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm animate-in fade-in duration-200">
            <span className="material-symbols-outlined text-secondary text-[18px]">favorite</span>
            <span>{cheerFeedback}</span>
          </div>
        )}

        {/* Hero Continue Reading Banner & Habit Tracker Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Primary Feature: Continue Reading Banner (8 cols) */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl shadow-sm p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden group border border-surface-container-high/60">
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            {/* Book Cover Jacket */}
            <div className="w-full md:w-44 flex-shrink-0 flex items-center justify-center">
              <div className="relative w-36 md:w-44 h-56 md:h-64 rounded-xl overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-[1.02] flex-shrink-0 bg-surface-container-high">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl-cyzqgCgSfeO8IudUJI1RcXJL1xmNKvB9TE7o9R76AMHWT7Tzhc1vQsJACcRpXbyOr5zRRDMSqe7J_kJrzRnzfSdAJxeYGPmpC8U7QBd-svC6ZKjNn6_XOSFOI20LtYAQbIw0uPFWJhUe6N2SVx0CDMgf93Cb6VvMRbOMl6OfMCtoLXVxPQcnEWx7W2kkhuhfXnGRDTY5B42y202LYaEu8wdoPsyUarPjqYSPXOhMrzS2X3SX4keYQ"
                  alt="Tomorrow, and Tomorrow, and Tomorrow Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 bg-inverse-surface/85 backdrop-blur-md px-2 py-0.5 rounded-full text-inverse-on-surface text-xs font-semibold flex items-center gap-1 shadow-xs">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-fixed">auto_stories</span>
                  <span>68% Read</span>
                </div>
              </div>
            </div>

            {/* Book Meta & Callout Content */}
            <div className="flex-1 flex flex-col justify-between z-10 min-w-0">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs text-primary uppercase font-bold tracking-wider">Current Read</span>
                  <span className="text-xs text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-outline">schedule</span>
                    ~42 mins left
                  </span>
                </div>
                <h2 className="font-serif text-2xl text-on-surface tracking-tight font-normal">
                  Tomorrow, and Tomorrow, and Tomorrow
                </h2>
                <p className="text-sm text-on-surface-variant mb-3">by Gabrielle Zevin</p>

                {/* Progress Bar */}
                <div className="space-y-1.5 my-3">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-on-surface">Page 274 of 416</span>
                    <span className="text-primary">68%</span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-container rounded-full transition-all duration-700 ease-out"
                      style={{ width: '68%' }}
                    />
                  </div>
                </div>

                {/* Stylized Quote Callout */}
                <div className="bg-tertiary-fixed/30 rounded-xl p-3 my-3 relative">
                  <span className="material-symbols-outlined absolute -top-2.5 left-2 text-tertiary text-[18px]">
                    format_quote
                  </span>
                  <p className="font-serif italic text-sm text-on-surface-variant pt-1 pl-2 leading-relaxed">
                    “To allow yourself to play with another person is no small risk. It means allowing yourself to be open, to be exposed…”
                  </p>
                </div>
              </div>

              {/* Bottom Action Deck */}
              <div className="flex items-center flex-wrap gap-2.5 pt-1">
                <button
                  onClick={() => onNavigate('reader')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold transition-colors shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                  <span>Continue Reading</span>
                </button>
                <button
                  onClick={() =>
                    onOpenShareModal(
                      'To allow yourself to play with another person is no small risk. It means allowing yourself to be open, to be exposed…',
                      'Tomorrow, and Tomorrow, and Tomorrow',
                      'Gabrielle Zevin'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors"
                >
                  <span className="material-symbols-outlined text-[17px] text-outline">ios_share</span>
                  <span>Share Card</span>
                </button>
                <button
                  onClick={() => onNavigate('buddy-hub')}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-secondary-container/60 hover:bg-secondary-container text-on-secondary-container text-xs font-semibold transition-colors ml-auto"
                >
                  <span className="material-symbols-outlined text-[17px]">group</span>
                  <span>Buddy Room</span>
                </button>
              </div>
            </div>
          </div>

          {/* Habit Tracker Widget (4 cols) */}
          <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl shadow-sm p-6 flex flex-col justify-between border border-surface-container-high/60">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs text-secondary font-semibold uppercase tracking-wider">
                    Habit Telemetry
                  </span>
                  <h3 className="font-serif text-xl text-on-surface">Weekly Rhythm</h3>
                </div>
                <div className="flex items-center gap-1 bg-secondary-container/60 text-on-secondary-container px-2.5 py-1 rounded-full text-xs font-semibold">
                  <span>🔥</span>
                  <span>12 Days</span>
                </div>
              </div>

              {/* Target Card Pill */}
              <div className="bg-surface-container-low rounded-xl p-3 flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-on-surface">Daily Goal: 30 Mins</p>
                    <p className="text-[11px] text-on-surface-variant">34m read today • 100%</p>
                  </div>
                </div>
                <span className="text-xs text-secondary font-bold">Done</span>
              </div>

              {/* Weekly Column Chart */}
              <div className="pt-1">
                <div className="flex items-end justify-between h-28 gap-1.5 px-1 pb-1">
                  {[
                    { day: 'M', mins: '45m', height: '60%', isToday: false, isSat: false },
                    { day: 'T', mins: '30m', height: '40%', isToday: false, isSat: false },
                    { day: 'W', mins: '55m', height: '75%', isToday: false, isSat: false },
                    { day: 'T', mins: '40m', height: '52%', isToday: false, isSat: false },
                    { day: 'F', mins: '65m', height: '90%', isToday: false, isSat: false },
                    { day: 'S', mins: '70m', height: '95%', isToday: false, isSat: true },
                    { day: 'S', mins: '34m', height: '48%', isToday: true, isSat: false },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer">
                      <div
                        className={`text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity ${
                          bar.isToday ? 'text-primary' : 'text-on-surface-variant'
                        }`}
                      >
                        {bar.mins}
                      </div>
                      <div
                        className={`w-full max-w-[28px] rounded-t-md transition-all ${
                          bar.isToday
                            ? 'bg-primary-container shadow-xs'
                            : bar.isSat
                            ? 'bg-secondary shadow-xs'
                            : 'bg-surface-container-high hover:bg-primary-container'
                        }`}
                        style={{ height: bar.height }}
                      />
                      <span
                        className={`text-[11px] ${
                          bar.isToday
                            ? 'text-primary font-bold'
                            : bar.isSat
                            ? 'text-secondary font-bold'
                            : 'text-outline'
                        }`}
                      >
                        {bar.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Metric Footer */}
            <div className="pt-3 mt-3 bg-surface-container-low rounded-xl px-4 py-2.5 flex items-center justify-between text-center">
              <div>
                <span className="text-[11px] text-outline block">Daily Avg</span>
                <span className="text-sm font-bold text-on-surface">48m</span>
              </div>
              <div className="w-px h-6 bg-surface-container-high" />
              <div>
                <span className="text-[11px] text-outline block">Best Streak</span>
                <span className="text-sm font-bold text-on-surface">34 Days</span>
              </div>
              <div className="w-px h-6 bg-surface-container-high" />
              <div>
                <span className="text-[11px] text-outline block">This Month</span>
                <span className="text-sm font-bold text-on-surface">18.4 hrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Read With Friends Live Carousel */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 border border-surface-container-high/60">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-secondary animate-ping" />
              <h3 className="font-serif text-xl text-on-surface">Reading Parlor</h3>
              <span className="text-xs text-on-surface-variant">• 3 Friends Active Now</span>
            </div>
            <button
              onClick={() => onNavigate('buddy-hub')}
              className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
            >
              <span>Explore Buddy Hub</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="bg-surface rounded-xl p-4 flex flex-col justify-between hover:bg-surface-container-low transition-colors shadow-xs border border-surface-container-high/60"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={friend.avatarUrl}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full object-cover shadow-xs"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-secondary ring-2 ring-surface" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-semibold text-sm text-on-surface truncate">{friend.name}</h4>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                        {friend.mode} Mode
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant truncate">
                      Reading <span className="text-on-surface font-medium">{friend.readingBook}</span>
                    </p>
                    <p className="text-[11px] text-secondary flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[13px]">menu_book</span>
                      <span>{friend.sessionNote}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => onNavigate('buddy-hub')}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[15px]">group</span>
                    <span>Join Session</span>
                  </button>
                  <button
                    onClick={() => handleSendCheer(friend.name)}
                    className="py-1.5 px-3 rounded-lg bg-secondary-container/60 hover:bg-secondary hover:text-on-secondary text-on-secondary-container text-xs font-semibold transition-colors"
                    title="Send Cheer"
                  >
                    <span>☕ Cheer</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area: Book Shelves + Sidebar Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Library Shelf with Tabs (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
              <h3 className="font-serif text-2xl text-on-surface">Book Shelves</h3>

              {/* Tabs Component */}
              <div className="inline-flex p-1 bg-surface-container rounded-xl gap-1">
                <button
                  onClick={() => setShelfTab('reading')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    shelfTab === 'reading'
                      ? 'bg-surface-container-lowest text-primary shadow-xs font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Currently Reading (3)
                </button>
                <button
                  onClick={() => setShelfTab('want')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    shelfTab === 'want'
                      ? 'bg-surface-container-lowest text-primary shadow-xs font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Want to Read (12)
                </button>
                <button
                  onClick={() => setShelfTab('finished')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    shelfTab === 'finished'
                      ? 'bg-surface-container-lowest text-primary shadow-xs font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Finished (18)
                </button>
              </div>
            </div>

            {/* Books Shelf Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredBooks.slice(0, 3).map((book) => (
                <div
                  key={book.id}
                  className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group border border-surface-container-high/60"
                >
                  <div>
                    <div className="relative w-full h-56 rounded-xl overflow-hidden mb-3 bg-surface-container-high shadow-xs">
                      <img
                        src={book.coverUrl}
                        alt={book.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 right-2 bg-inverse-surface/80 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-semibold text-inverse-on-surface">
                        {book.progressPercent}%
                      </span>
                      <span className="absolute bottom-2 left-2 bg-surface/90 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-semibold text-secondary">
                        {book.genre}
                      </span>
                    </div>

                    <h4 className="font-semibold text-sm text-on-surface truncate group-hover:text-primary transition-colors">
                      {book.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant">{book.author}</p>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 my-2">
                      <div className="flex text-tertiary">
                        <span className="material-symbols-outlined text-[16px]">star</span>
                        <span className="material-symbols-outlined text-[16px]">star</span>
                        <span className="material-symbols-outlined text-[16px]">star</span>
                        <span className="material-symbols-outlined text-[16px]">star</span>
                        <span className="material-symbols-outlined text-[16px]">star_half</span>
                      </div>
                      <span className="text-xs text-on-surface-variant font-medium ml-1">{book.rating}</span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden my-2">
                      <div
                        className="h-full bg-primary-container rounded-full"
                        style={{ width: `${book.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-outline">
                      P. {book.currentPage} of {book.totalPages}
                    </span>
                    <button
                      onClick={() => onNavigate('reader')}
                      className="px-3 py-1 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface text-xs font-semibold transition-colors"
                    >
                      Read
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => onNavigate('my-library')}
                className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>View All Library Books (48)</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Right Column: Saved Quotes Widget + Ambient Sound (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 flex flex-col gap-4 border border-surface-container-high/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">format_quote</span>
                  <h3 className="font-serif text-xl text-on-surface">Saved Quotes</h3>
                </div>
                <span className="text-xs text-primary font-medium">View All (47)</span>
              </div>

              {/* Quotes List */}
              <div className="space-y-3">
                {quotes.slice(0, 3).map((q) => (
                  <div
                    key={q.id}
                    className="bg-surface-container-low rounded-xl p-3.5 flex flex-col gap-2 relative group hover:bg-surface-container transition-colors"
                  >
                    <p className="font-serif italic text-xs md:text-sm text-on-surface leading-relaxed">
                      “{q.text}”
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-xs font-semibold text-primary block">{q.bookTitle}</span>
                        <span className="text-[11px] text-outline">
                          {q.author} {q.page ? `• P. ${q.page}` : q.finishedAgo ? `• ${q.finishedAgo}` : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => copyQuoteToClipboard(q)}
                          aria-label="Copy Quote"
                          className="w-7 h-7 rounded-lg bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors shadow-xs"
                          title="Copy Quote"
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            {copiedQuoteId === q.id ? 'check' : 'content_copy'}
                          </span>
                        </button>
                        <button
                          onClick={() => onOpenShareModal(q.text, q.bookTitle, q.author)}
                          aria-label="Generate Share Card"
                          className="w-7 h-7 rounded-lg bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors shadow-xs"
                          title="Generate Share Card"
                        >
                          <span className="material-symbols-outlined text-[15px]">share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Quick Thought Form */}
              <form onSubmit={handleAddThought} className="pt-1">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={quickThought}
                    onChange={(e) => setQuickThought(e.target.value)}
                    placeholder="Type or paste a quick thought..."
                    className="w-full pl-3 pr-10 py-2 bg-surface-container-low rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-surface-container-high"
                  />
                  <button
                    type="submit"
                    aria-label="Submit Note"
                    className="absolute right-2 text-primary hover:text-primary-container p-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
