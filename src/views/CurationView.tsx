import React, { useState } from 'react';
import { Book, CustomShelfData, ViewType } from '../types.ts';
import { MOCK_RECOMMENDATIONS, INITIAL_SHELVES } from '../data/mockData.ts';
import { CustomizeShelfModal } from '../components/CustomizeShelfModal.tsx';

interface CurationViewProps {
  onNavigate: (view: ViewType) => void;
  onOpenShareModal: (quote?: string, book?: string, author?: string) => void;
}

export const CurationView: React.FC<CurationViewProps> = ({ onNavigate, onOpenShareModal }) => {
  const [selectedMood, setSelectedMood] = useState<string>('All');
  const [readingEnergy, setReadingEnergy] = useState<string>('Gentle & Immersive');
  const [shelves, setShelves] = useState<CustomShelfData[]>(INITIAL_SHELVES);
  const [editingShelf, setEditingShelf] = useState<CustomShelfData | null>(null);
  const [isShelfModalOpen, setIsShelfModalOpen] = useState(false);
  const [revealedBlindDate, setRevealedBlindDate] = useState(false);
  const [savedBooks, setSavedBooks] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const moods = [
    'All',
    'Lush & Atmospheric',
    'Melancholic & Reflective',
    'Philosophical Inquiry',
    'Warm & Comforting',
    'Speculative / Sci-Fi',
    'Fast-Paced Thrill',
  ];

  const energyLevels = [
    { label: 'Gentle & Immersive', icon: 'spa', desc: 'Slow-paced, richly textured prose' },
    { label: 'Intellectually Demanding', icon: 'psychology', desc: 'Dense ideas, experimental structures' },
    { label: 'Light & Breezy', icon: 'air', desc: 'Easy page-turners under 300 pages' },
    { label: 'Deep Focus Long Read', icon: 'hourglass_bottom', desc: 'Epic journeys for weekend marathons' },
  ];

  const filteredRecs = MOCK_RECOMMENDATIONS.filter(rec => {
    if (selectedMood === 'All') return true;
    return rec.moodMatch.toLowerCase().includes(selectedMood.toLowerCase()) || 
           rec.tags.some(t => t.toLowerCase().includes(selectedMood.toLowerCase()));
  });

  const handleSaveBook = (bookId: string, title: string) => {
    setSavedBooks(prev => {
      const next = new Set(prev);
      if (next.has(bookId)) {
        next.delete(bookId);
        showToast(`Removed "${title}" from wishlist`);
      } else {
        next.add(bookId);
        showToast(`Saved "${title}" to your Reading Wishlist`);
      }
      return next;
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveShelf = (updatedShelf: CustomShelfData) => {
    setShelves(prev => {
      const idx = prev.findIndex(s => s.id === updatedShelf.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = updatedShelf;
        return next;
      }
      return [...prev, updatedShelf];
    });
    showToast(`Shelf "${updatedShelf.title}" saved successfully`);
  };

  const handleCreateNewShelf = () => {
    const newShelf: CustomShelfData = {
      id: `shelf_${Date.now()}`,
      title: 'New Aesthetic Collection',
      description: 'A quiet curation of personal favorites.',
      theme: 'sage',
      icon: 'bookmark',
      isPublic: true,
      booksCount: 1,
      covers: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400'
      ],
      books: [
        {
          id: 'temp1',
          title: 'Piranesi',
          author: 'Susanna Clarke',
          coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
          readingStatus: 'want-to-read',
          currentPage: 0,
          totalPages: 245,
          userRating: 5
        }
      ]
    };
    setEditingShelf(newShelf);
    setIsShelfModalOpen(true);
  };

  return (
    <div className="min-w-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2d221c] text-[#f7efe6] px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-[#48372d] animate-fade-in">
          <span className="material-symbols-outlined text-[#e37f48] text-sm">auto_stories</span>
          <span className="text-sm font-sans font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a1b12] via-[#3a271b] to-[#1c120c] text-[#fdfaf7] p-8 md:p-12 shadow-xl border border-[#4a3426]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(227,127,72,0.18)_0%,transparent_70%)] pointer-events-none -mr-16 -mt-16" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e37f48]/20 border border-[#e37f48]/40 text-[#e37f48] text-xs font-semibold uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            Algorithmic Harmony & Bespoke Curation
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#faf3ea] tracking-tight leading-tight">
            Curated for Your Mind, Cadence & Mood
          </h1>
          <p className="text-base md:text-lg font-serif italic text-[#dfcbbe] leading-relaxed">
            Recommendations calibrated not just by genre, but by your reading velocity, current psychological appetite, and what your trusted literary circle whispers about.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-sans text-[#cbb6a7]">
            <span className="flex items-center gap-1.5 bg-[#ffffff]/10 px-3 py-1.5 rounded-lg border border-white/10">
              <span className="material-symbols-outlined text-sm text-[#e37f48]">speed</span>
              Your Velocity: 44 pages/hr
            </span>
            <span className="flex items-center gap-1.5 bg-[#ffffff]/10 px-3 py-1.5 rounded-lg border border-white/10">
              <span className="material-symbols-outlined text-sm text-[#e37f48]">schedule</span>
              Est. Next Finish: ~4.2 days
            </span>
            <span className="flex items-center gap-1.5 bg-[#ffffff]/10 px-3 py-1.5 rounded-lg border border-white/10">
              <span className="material-symbols-outlined text-sm text-[#e37f48]">group</span>
              Active Buddy Circle: 14 Readers
            </span>
          </div>
        </div>
      </section>

      {/* Mood & Reading Energy Spectrum Selector */}
      <section className="bg-[#fcf8f3] dark:bg-[#1f1915] p-6 md:p-8 rounded-2xl border border-[#ede3d8] dark:border-[#382d25] shadow-xs space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-serif font-bold text-[#2d221c] dark:text-[#f2e9e1] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#7e370d]">tune</span>
              Select Your Current Reading Energy
            </h2>
            <span className="text-xs text-[#857366] font-sans">Adapts page lengths & pacing complexity</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {energyLevels.map(lvl => (
              <button
                key={lvl.label}
                onClick={() => setReadingEnergy(lvl.label)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  readingEnergy === lvl.label
                    ? 'bg-[#7e370d] text-white border-[#7e370d] shadow-md transform -translate-y-0.5'
                    : 'bg-white dark:bg-[#28201a] text-[#3c2f26] dark:text-[#d9ccc2] border-[#e7dbce] dark:border-[#3d3128] hover:border-[#7e370d]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`material-symbols-outlined text-lg ${readingEnergy === lvl.label ? 'text-[#ffdbcb]' : 'text-[#7e370d]'}`}>
                    {lvl.icon}
                  </span>
                  {readingEnergy === lvl.label && (
                    <span className="material-symbols-outlined text-sm text-[#ffdbcb]">check_circle</span>
                  )}
                </div>
                <div className="font-serif font-bold text-sm">{lvl.label}</div>
                <div className={`text-xs mt-1 leading-snug ${readingEnergy === lvl.label ? 'text-[#f5d9c8]' : 'text-[#857366] dark:text-[#a89689]'}`}>
                  {lvl.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mood Tags ribbon */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#857366] block mb-2.5">
            Atmosphere & Mood Tone
          </span>
          <div className="flex flex-wrap gap-2">
            {moods.map(mood => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all border ${
                  selectedMood === mood
                    ? 'bg-[#2d221c] text-[#f7efe6] border-[#2d221c] shadow-xs'
                    : 'bg-white dark:bg-[#28201a] text-[#544337] dark:text-[#c4b3a5] border-[#e6dcd1] dark:border-[#3d3128] hover:bg-[#f6eee5]'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid of Habit-Calibrated Recommendations */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#2d221c] dark:text-[#f5ece4]">
              Habit-Calibrated Recommendations
            </h2>
            <p className="text-sm text-[#7a685b] dark:text-[#b09e91] font-serif italic">
              Estimated completion times tailored precisely to your reading rate
            </p>
          </div>
          <span className="text-xs font-sans font-medium bg-[#f0e7dd] dark:bg-[#2a221c] text-[#7e370d] px-3 py-1.5 rounded-full border border-[#dfd4c6] dark:border-[#40332a]">
            {filteredRecs.length} curated matches
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecs.map(rec => {
            const isSaved = savedBooks.has(rec.id);
            return (
              <div
                key={rec.id}
                className="group relative bg-[#fdfaf7] dark:bg-[#241d18] rounded-2xl border border-[#ede3d8] dark:border-[#3d3128] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Affinity Badge */}
                <div className="p-5 pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#7e370d]/10 dark:bg-[#7e370d]/30 text-[#7e370d] dark:text-[#e37f48] border border-[#7e370d]/20">
                      <span className="material-symbols-outlined text-xs">verified</span>
                      {rec.affinityScore}% Taste Affinity
                    </span>

                    <button
                      onClick={() => handleSaveBook(rec.id, rec.title)}
                      className={`p-2 rounded-full cursor-pointer transition-colors ${
                        isSaved 
                          ? 'bg-[#7e370d] text-white' 
                          : 'bg-[#f4ebe1] dark:bg-[#332821] text-[#7a685b] hover:text-[#7e370d]'
                      }`}
                      title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isSaved ? 'bookmark_added' : 'bookmark_border'}
                      </span>
                    </button>
                  </div>

                  <div className="flex gap-4">
                    <img
                      src={rec.coverUrl}
                      alt={rec.title}
                      className="w-24 h-36 object-cover rounded-xl shadow-md shrink-0 group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="space-y-1.5 min-w-0">
                      <h3 className="font-serif font-bold text-base text-[#2d221c] dark:text-[#f7efe6] leading-snug line-clamp-2">
                        {rec.title}
                      </h3>
                      <p className="text-xs font-sans text-[#7e370d] dark:text-[#e37f48] font-medium">
                        by {rec.author}
                      </p>
                      <div className="text-xs text-[#857366] dark:text-[#a89689] flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">menu_book</span>
                        {rec.pages} pages
                      </div>
                      <div className="text-xs font-medium text-[#2d221c] dark:text-[#e4d6ca] bg-[#f0e7dc] dark:bg-[#30251e] px-2 py-1 rounded-md inline-block">
                        ⚡ {rec.estimatedDaysToFinish}
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs font-serif italic text-[#5c4a3e] dark:text-[#c4b3a5] leading-relaxed line-clamp-3">
                    "{rec.reason}"
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {rec.tags.map(t => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-[#f4ebe1] dark:bg-[#2c221b] text-[#735e50] dark:text-[#b8a698] font-sans"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 pt-0 mt-3 border-t border-[#ede3d8] dark:border-[#382d25] flex items-center gap-2">
                  <button
                    onClick={() => {
                      onOpenShareModal(`"Reading gives us someplace to go when we have to stay where we are." — Inspired by ${rec.title}`, rec.title, rec.author);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-white dark:bg-[#2b221c] border border-[#dcd0c3] dark:border-[#423429] text-xs font-serif font-medium text-[#44352b] dark:text-[#dfd0c4] hover:bg-[#f8f1ea] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xs">share</span>
                    Quote Card
                  </button>
                  <button
                    onClick={() => {
                      showToast(`Started buddy read lobby for "${rec.title}"!`);
                      onNavigate('buddy-hub');
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#7e370d] text-white text-xs font-sans font-medium hover:bg-[#682c09] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-xs">group_add</span>
                    Buddy Read
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Buddy Circle Radar & Live Reading Overlay */}
      <section className="bg-gradient-to-br from-[#f8f2eb] via-[#f5ede3] to-[#efe3d5] dark:from-[#241c17] dark:via-[#201813] dark:to-[#1a130f] p-8 rounded-3xl border border-[#ded1c2] dark:border-[#382c23] shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7e370d]/10 text-[#7e370d] text-xs font-semibold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">radar</span>
              Inner Circle Synchronicity
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2d221c] dark:text-[#f8eee5]">
              Buddy Circle Radar
            </h2>
            <p className="text-sm font-serif italic text-[#6a5648] dark:text-[#bdaaa0] leading-relaxed">
              Books currently generating high emotional resonance among your literary companions. Join an in-progress salon or sync your next chapter.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 dark:bg-[#2b221c]/70 border border-[#e5d8cb] dark:border-[#3f3127]">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                  alt="Maya Lin"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#7e370d]"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[#2d221c] dark:text-[#f8eee5] flex items-center justify-between">
                    <span>Maya Lin</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-400 px-2 py-0.5 rounded-full font-mono">
                      Reading Now
                    </span>
                  </div>
                  <div className="text-xs text-[#7e370d] truncate font-serif">Klara and the Sun (Ch. 4)</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 dark:bg-[#2b221c]/70 border border-[#e5d8cb] dark:border-[#3f3127]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
                  alt="Julian Thorne"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#b25329]"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[#2d221c] dark:text-[#f8eee5] flex items-center justify-between">
                    <span>Julian Thorne</span>
                    <span className="text-[10px] text-[#857366]">2h ago</span>
                  </div>
                  <div className="text-xs text-[#7e370d] truncate font-serif">Dune (Part 2: Muad'Dib)</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 dark:bg-[#2b221c]/70 border border-[#e5d8cb] dark:border-[#3f3127]">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                  alt="Elena Rostova"
                  className="w-10 h-10 rounded-full object-cover border-2 border-amber-600"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[#2d221c] dark:text-[#f8eee5] flex items-center justify-between">
                    <span>Elena Rostova</span>
                    <span className="text-[10px] text-[#857366]">1d ago</span>
                  </div>
                  <div className="text-xs text-[#7e370d] truncate font-serif">Sea of Tranquility (Finished) ★★★★★</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Blind Date with a Book feature */}
          <div className="lg:col-span-7">
            <div className="bg-[#241a14] text-[#fbf6f1] p-7 rounded-2xl border border-[#483528] shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#e37f48]">
                  <span className="material-symbols-outlined text-sm">redeem</span>
                  Curator's Blind Date with a Book
                </span>
                <span className="text-xs text-[#b8a698] font-sans">Wrapped in kraft paper</span>
              </div>

              {!revealedBlindDate ? (
                <div className="space-y-4 py-4 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#3d2c22] border-2 border-dashed border-[#e37f48] flex items-center justify-center text-[#e37f48] shadow-inner">
                    <span className="material-symbols-outlined text-3xl">sentiment_very_satisfied</span>
                  </div>
                  <div className="max-w-md mx-auto space-y-2">
                    <h3 className="text-lg font-serif font-bold text-[#f2e6dc]">
                      "A labyrinth of endless stone halls, tides that crash up staircases, and a soul untouched by malice."
                    </h3>
                    <p className="text-xs font-sans text-[#cbb8aa]">
                      Clues: 245 pages • Subtle philosophical fantasy • Journal entries • Solitary wonder
                    </p>
                  </div>
                  <button
                    onClick={() => setRevealedBlindDate(true)}
                    className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#e37f48] text-[#1c120c] font-bold text-xs uppercase tracking-wider hover:bg-[#eb9260] transition-colors cursor-pointer shadow-md"
                  >
                    <span className="material-symbols-outlined text-sm">unfold_more</span>
                    Unwrap & Reveal Title
                  </button>
                </div>
              ) : (
                <div className="space-y-4 py-2 animate-fade-in">
                  <div className="flex items-center gap-4 bg-[#32231b] p-4 rounded-xl border border-[#4d392d]">
                    <img
                      src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400"
                      alt="Piranesi"
                      className="w-20 h-28 object-cover rounded-lg shadow-md"
                    />
                    <div className="space-y-1">
                      <div className="text-xs uppercase tracking-wider text-[#e37f48] font-bold">Unwrapped Book</div>
                      <h4 className="font-serif font-bold text-lg text-[#fbf6f1]">Piranesi</h4>
                      <p className="text-xs text-[#cbb8aa]">by Susanna Clarke (245 pages)</p>
                      <p className="text-xs text-[#dec9bc] italic mt-1 font-serif">
                        "The Beauty of the House is immeasurable; its Kindness infinite."
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 pt-1">
                    <button
                      onClick={() => setRevealedBlindDate(false)}
                      className="text-xs text-[#a89689] hover:text-[#fbf6f1] underline cursor-pointer"
                    >
                      Wrap up again
                    </button>
                    <button
                      onClick={() => onNavigate('reader')}
                      className="px-4 py-2 rounded-xl bg-[#e37f48] text-[#1f140e] font-sans font-bold text-xs hover:bg-[#eb9260] transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">book</span>
                      Open In Reader
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Aesthetic Shelves Manager */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#2d221c] dark:text-[#f8eee5]">
              Your Bespoke Curated Shelves
            </h2>
            <p className="text-sm font-serif italic text-[#7a685b] dark:text-[#bdaaa0]">
              Create mood-specific sanctuaries with custom color palettes and reorderable volumes
            </p>
          </div>
          <button
            onClick={handleCreateNewShelf}
            className="px-4 py-2.5 rounded-xl bg-[#7e370d] text-white text-xs font-sans font-semibold hover:bg-[#682c09] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-base">library_add</span>
            New Aesthetic Shelf
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shelves.map(shelf => (
            <div
              key={shelf.id}
              className="bg-white dark:bg-[#251e19] rounded-2xl border border-[#ece1d4] dark:border-[#3d3128] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#7e370d] text-lg">
                      {shelf.icon || 'bookmark'}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#857366] dark:text-[#a89689]">
                      Theme: {shelf.theme}
                    </span>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    shelf.isPublic 
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' 
                      : 'bg-zinc-100 text-zinc-700'
                  }`}>
                    {shelf.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-[#2d221c] dark:text-[#f8eee5] mb-1">
                  {shelf.title}
                </h3>
                <p className="text-xs font-serif italic text-[#6a5648] dark:text-[#b8a698] line-clamp-2 mb-4">
                  "{shelf.description}"
                </p>

                {/* Shelf books thumbnail stack */}
                <div className="flex -space-x-3 overflow-hidden py-2">
                  {(shelf.covers || []).slice(0, 4).map((cov, idx) => (
                    <img
                      key={idx}
                      src={cov}
                      alt="Cover"
                      className="inline-block h-16 w-11 rounded-md ring-2 ring-white dark:ring-[#251e19] object-cover shadow-xs"
                    />
                  ))}
                  {shelf.covers && shelf.covers.length > 4 && (
                    <div className="flex items-center justify-center h-16 w-11 rounded-md bg-[#f0e7dd] dark:bg-[#382d25] text-[#7e370d] font-bold text-xs ring-2 ring-white dark:ring-[#251e19]">
                      +{shelf.covers.length - 4}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-[#faf5ef] dark:bg-[#201914] border-t border-[#ede3d8] dark:border-[#382c23] flex items-center justify-between text-xs">
                <span className="text-[#857366] font-sans">
                  {shelf.booksCount || (shelf.covers ? shelf.covers.length : 0)} volumes
                </span>
                <button
                  onClick={() => {
                    setEditingShelf(shelf);
                    setIsShelfModalOpen(true);
                  }}
                  className="font-serif font-semibold text-[#7e370d] dark:text-[#e37f48] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">palette</span>
                  Customize Shelf
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customize Shelf Modal */}
      <CustomizeShelfModal
        isOpen={isShelfModalOpen}
        onClose={() => setIsShelfModalOpen(false)}
        shelf={editingShelf}
        onSave={handleSaveShelf}
      />
    </div>
  );
};
