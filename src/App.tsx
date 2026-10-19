/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewType, Book, Quote } from './types.ts';
import { INITIAL_BOOKS, MOCK_FRIENDS, INITIAL_QUOTES } from './data/mockData.ts';
import { Navbar } from './components/Navbar.tsx';
import { SocialShareModal } from './components/SocialShareModal.tsx';
import { DashboardView } from './views/DashboardView.tsx';
import { MyLibraryView } from './views/MyLibraryView.tsx';
import { ReaderView } from './views/ReaderView.tsx';
import { BuddyHubView } from './views/BuddyHubView.tsx';
import { CurationView } from './views/CurationView.tsx';
import { CommunityView } from './views/CommunityView.tsx';
import { StatsStreaksView } from './views/StatsStreaksView.tsx';
import { BindnestLogoSimplified } from './components/BindnestLogo.tsx';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [quotes, setQuotes] = useState<Quote[]>(INITIAL_QUOTES);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareModalData, setShareModalData] = useState<{
    quote?: string;
    book?: string;
    author?: string;
  }>({});

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleOpenShareModal = (quote?: string, book?: string, author?: string) => {
    setShareModalData({ quote, book, author });
    setIsShareModalOpen(true);
  };

  const handleAddQuote = (newQuote: Quote) => {
    setQuotes((prev) => [newQuote, ...prev]);
  };

  const handleUpdateBookStatus = (bookId: string, status: 'reading' | 'want' | 'finished') => {
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, status } : b))
    );
  };

  return (
    <div className="min-h-screen bg-[#fcf9f5] text-[#2d221c] flex flex-col font-sans selection:bg-[#f0d6c6] selection:text-[#7e370d]">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenShareModal={() =>
          handleOpenShareModal(
            `"To love a book is to agree to have your solitude interrupted by a phantom voice that understands you better than your reflection."`,
            'Tomorrow, and Tomorrow, and Tomorrow',
            'Gabrielle Zevin'
          )
        }
      />

      {/* Main Sanctuary Views */}
      <main className="flex-1 pt-28 pb-16">
        {currentView === 'dashboard' && (
          <DashboardView
            books={books}
            quotes={quotes}
            friends={MOCK_FRIENDS}
            onAddQuote={handleAddQuote}
            onNavigate={setCurrentView}
            onOpenShareModal={handleOpenShareModal}
          />
        )}

        {currentView === 'my-library' && (
          <MyLibraryView
            books={books}
            onNavigate={setCurrentView}
            onOpenShareModal={handleOpenShareModal}
            onUpdateBookStatus={handleUpdateBookStatus}
          />
        )}

        {currentView === 'reader' && (
          <ReaderView
            onNavigate={setCurrentView}
            onOpenShareModal={handleOpenShareModal}
          />
        )}

        {currentView === 'buddy-hub' && (
          <BuddyHubView
            friends={MOCK_FRIENDS}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'curation' && (
          <CurationView
            onNavigate={setCurrentView}
            onOpenShareModal={handleOpenShareModal}
          />
        )}

        {currentView === 'community' && (
          <CommunityView
            onNavigate={setCurrentView}
            onOpenShareModal={handleOpenShareModal}
          />
        )}

        {currentView === 'stats-streaks' && (
          <StatsStreaksView
            onNavigate={setCurrentView}
            onOpenShareModal={handleOpenShareModal}
          />
        )}
      </main>

      {/* Sanctuary Footer */}
      <footer className="border-t border-[#ede2d5] bg-[#f7efe6] py-12 px-4 sm:px-6 lg:px-8 text-xs text-[#857366]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <BindnestLogoSimplified className="h-7 w-auto object-contain shrink-0" />
            <div>
              <div className="font-serif font-bold text-sm text-[#2d221c] tracking-tight">Bindnest</div>
              <div className="text-[11px] font-serif italic text-[#7a685b]">
                A Quiet Space for Thoughtful Readers
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-sans">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="hover:text-[#7e370d] transition-colors cursor-pointer"
            >
              Sanctuary
            </button>
            <button
              onClick={() => setCurrentView('my-library')}
              className="hover:text-[#7e370d] transition-colors cursor-pointer"
            >
              Library Repository
            </button>
            <button
              onClick={() => setCurrentView('reader')}
              className="hover:text-[#7e370d] transition-colors cursor-pointer"
            >
              Distraction-Free Reader
            </button>
            <button
              onClick={() => setCurrentView('buddy-hub')}
              className="hover:text-[#7e370d] transition-colors cursor-pointer"
            >
              Buddy Pacing Hub
            </button>
            <button
              onClick={() => setCurrentView('curation')}
              className="hover:text-[#7e370d] transition-colors cursor-pointer"
            >
              Bespoke Shelves
            </button>
            <button
              onClick={() => setCurrentView('community')}
              className="hover:text-[#7e370d] transition-colors cursor-pointer"
            >
              Reading Parlor
            </button>
            <button
              onClick={() => setCurrentView('stats-streaks')}
              className="hover:text-[#7e370d] transition-colors cursor-pointer"
            >
              Telemetry & Streaks
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-[#7e370d] bg-[#f0e6dc] px-3 py-1.5 rounded-full border border-[#dfd2c4]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Telemetry Online • 14 Days Active</span>
          </div>
        </div>
      </footer>

      {/* Global Cardify / Social Share Modal */}
      <SocialShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        defaultQuote={shareModalData.quote}
        defaultBook={shareModalData.book}
        defaultAuthor={shareModalData.author}
      />
    </div>
  );
}
