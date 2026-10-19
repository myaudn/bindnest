import React, { useState } from 'react';
import { Book, ViewType } from '../types.ts';

interface MyLibraryViewProps {
  onNavigate: (view: ViewType) => void;
  books: Book[];
  onOpenShareModal: (quote?: string, book?: string, author?: string) => void;
  onUpdateBookStatus: (bookId: string, status: 'reading' | 'want' | 'finished') => void;
}

export const MyLibraryView: React.FC<MyLibraryViewProps> = ({
  onNavigate,
  books,
  onOpenShareModal,
  onUpdateBookStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'reading' | 'want' | 'finished' | 'custom'>('reading');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('Recently Opened');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [genreFilter, setGenreFilter] = useState<string>('all');
  const [onlyDownloaded, setOnlyDownloaded] = useState<boolean>(false);
  const [onlyAudio, setOnlyAudio] = useState<boolean>(false);
  const [menuBookId, setMenuBookId] = useState<string | null>(null);
  const [cacheCleared, setCacheCleared] = useState<boolean>(false);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newPages, setNewPages] = useState('320');
  const [newGenre, setNewGenre] = useState('Literary Fiction');

  const filteredBooks = books.filter((book) => {
    if (activeTab === 'reading' && book.status !== 'reading') return false;
    if (activeTab === 'want' && book.status !== 'want') return false;
    if (activeTab === 'finished' && book.status !== 'finished') return false;
    if (onlyDownloaded && !book.downloaded) return false;
    if (onlyAudio && !book.audioSync) return false;
    if (genreFilter !== 'all' && !book.genre?.toLowerCase().includes(genreFilter.toLowerCase())) return false;
    if (
      searchFilter.trim() &&
      !book.title.toLowerCase().includes(searchFilter.toLowerCase()) &&
      !book.author.toLowerCase().includes(searchFilter.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleClearCache = () => {
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 2500);
  };

  const handleAddNewBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const addedBook: Book = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      author: newAuthor || 'Unknown Author',
      coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLg42v2HTZYD95ONoSA5lUAbHYiuvXXnvNElmzmXsuLyR6_2WG5uBop1AQXge-H57vz4-ucsioEJB18ACzHyx4VqF94HfhdmgLkRi8n56md1nbNX3B944ar5sZCeThj41QXE1LkItqwuOdINn6qNQv7uVBIg3q9HFmRRMcBPlKJR3-FWfmpT7QA85yYk4p28JW_q5Zkw7t7pR33dBUvXHCbJhYIQvyyrjoDs4un8ImS43GF9RR6EYjyg',
      alt: newTitle,
      totalPages: parseInt(newPages) || 300,
      currentPage: 0,
      progressPercent: 0,
      status: 'want',
      genre: newGenre,
      rating: 4.5,
      downloaded: true,
      audioSync: false,
    };
    books.push(addedBook);
    setIsAddBookModalOpen(false);
    setNewTitle('');
    setNewAuthor('');
  };

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1280px] w-full mx-auto px-4 lg:px-12 py-6 flex flex-col gap-6">
        {/* Top Breadcrumb & Page Identification */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs text-outline uppercase tracking-wider">
              <span>Bindnest Shelf</span>
              <span>/</span>
              <span className="text-primary font-semibold">Personal Repository</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-on-surface tracking-tight font-normal">
              Personal Library
            </h1>
            <p className="text-xs md:text-sm text-on-surface-variant flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary" />
              <span>48 Books cataloged</span>
              <span className="text-outline">•</span>
              <span className="font-medium text-primary">3 currently in progress</span>
              <span className="text-outline">•</span>
              <span>1,820 pages read this month</span>
            </p>
          </div>

          {/* Action Cluster */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setIsAddBookModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">file_upload</span>
              <span>Import EPUB / PDF</span>
            </button>
            <button
              onClick={() => setIsAddBookModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold shadow-xs transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Add New Book</span>
            </button>
          </div>
        </div>

        {/* Search, Discovery & Primary Filter Surface */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container-high/60 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:max-w-xl">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[19px]">
                search
              </span>
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search your library by title, author, or ISBN... (Ctrl+K)"
                className="w-full pl-11 pr-20 py-2.5 rounded-xl bg-surface-container-low text-xs text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all border border-surface-container-high"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-surface-container-highest text-outline text-[10px] font-mono">
                Ctrl K
              </kbd>
            </div>

            {/* Layout and Sorting Controls */}
            <div className="flex items-center justify-between w-full lg:w-auto gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-outline hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold py-2 px-3 rounded-lg focus:outline-none cursor-pointer transition-colors border border-surface-container-high"
                >
                  <option>Recently Opened</option>
                  <option>Progress % (High-Low)</option>
                  <option>Title (A-Z)</option>
                  <option>Author (A-Z)</option>
                  <option>Highest Rated</option>
                </select>
              </div>

              {/* View Mode Toggles */}
              <div className="flex items-center p-1 rounded-lg bg-surface-container-low border border-surface-container-high">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`w-8 h-8 rounded flex items-center justify-center transition-all ${
                    viewMode === 'grid'
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-outline hover:text-on-surface'
                  }`}
                  title="Grid view"
                >
                  <span className="material-symbols-outlined text-[18px]">grid_view</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`w-8 h-8 rounded flex items-center justify-center transition-all ${
                    viewMode === 'list'
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-outline hover:text-on-surface'
                  }`}
                  title="List view"
                >
                  <span className="material-symbols-outlined text-[18px]">view_list</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Filter Chips Ribbon */}
          <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="h-8 px-3 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-xs cursor-pointer focus:outline-none border border-surface-container-high"
            >
              <option value="all">Genre: All</option>
              <option value="fiction">Literary Fiction</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="fantasy">Fantasy</option>
              <option value="mystery">Cozy Mystery</option>
            </select>

            <button
              onClick={() => setOnlyAudio(!onlyAudio)}
              className={`h-8 px-3 rounded-full flex items-center gap-1.5 transition-colors border ${
                onlyAudio
                  ? 'bg-secondary-container text-on-secondary-container border-secondary'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">graphic_eq</span>
              <span>Audio Sync Available</span>
            </button>

            <button
              onClick={() => setOnlyDownloaded(!onlyDownloaded)}
              className={`h-8 px-3 rounded-full flex items-center gap-1.5 transition-colors border ${
                onlyDownloaded
                  ? 'bg-secondary-container text-on-secondary-container border-secondary'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">offline_pin</span>
              <span>Downloaded Only</span>
            </button>

            {(genreFilter !== 'all' || onlyAudio || onlyDownloaded || searchFilter) && (
              <button
                onClick={() => {
                  setGenreFilter('all');
                  setOnlyAudio(false);
                  setOnlyDownloaded(false);
                  setSearchFilter('');
                }}
                className="text-primary hover:underline text-xs ml-auto px-2 py-1 font-semibold"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Shelf Tabs Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full">
          <button
            onClick={() => setActiveTab('reading')}
            className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 shrink-0 transition-all ${
              activeTab === 'reading'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
            }`}
          >
            <span>Currently Reading</span>
            <span className="px-2 py-0.2 bg-on-primary/20 rounded-full text-[10px]">3</span>
          </button>
          <button
            onClick={() => setActiveTab('want')}
            className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 shrink-0 transition-all ${
              activeTab === 'want'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
            }`}
          >
            <span>Want to Read</span>
            <span className="px-2 py-0.2 bg-surface-container-high rounded-full text-outline text-[10px]">
              24
            </span>
          </button>
          <button
            onClick={() => setActiveTab('finished')}
            className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 shrink-0 transition-all ${
              activeTab === 'finished'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
            }`}
          >
            <span>Finished</span>
            <span className="px-2 py-0.2 bg-surface-container-high rounded-full text-outline text-[10px]">
              18
            </span>
          </button>
          <button
            onClick={() => onNavigate('curation')}
            className="px-4 py-2 rounded-full text-xs font-semibold bg-surface-container-low hover:bg-surface-container text-on-surface-variant flex items-center gap-2 shrink-0 transition-colors"
          >
            <span>Custom Collections</span>
            <span className="px-2 py-0.2 bg-secondary-container text-on-secondary-container rounded-full text-[10px]">
              4
            </span>
          </button>
        </div>

        {/* Main Content Layout (Shelf Grid + Aside Drawer) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Books Shelf (9 cols) */}
          <div className="xl:col-span-9 flex flex-col gap-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className="group bg-surface-container-lowest rounded-2xl p-3.5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all border border-surface-container-high/60 relative"
                  >
                    <div className="flex flex-col">
                      <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-surface-container-low shadow-inner">
                        <img
                          src={book.coverUrl}
                          alt={book.alt}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm text-primary text-[10px] font-semibold shadow-xs">
                          {book.genre}
                        </span>
                        {book.downloaded && (
                          <span
                            className="absolute bottom-2 right-2 p-1 rounded-full bg-surface/80 backdrop-blur-md text-secondary"
                            title="Synced offline"
                          >
                            <span className="material-symbols-outlined text-[15px]">cloud_done</span>
                          </span>
                        )}
                      </div>

                      <div className="pt-3 flex flex-col gap-0.5">
                        <div className="flex items-start justify-between gap-1">
                          <h3 className="font-semibold text-xs text-on-surface line-clamp-1 leading-snug">
                            {book.title}
                          </h3>
                          <button
                            onClick={() => setMenuBookId(menuBookId === book.id ? null : book.id)}
                            className="text-outline hover:text-on-surface p-0.5 rounded"
                            aria-label="Book actions"
                          >
                            <span className="material-symbols-outlined text-[18px]">more_vert</span>
                          </button>
                        </div>
                        <p className="text-[11px] text-on-surface-variant">{book.author}</p>
                        {book.lastReadTime && (
                          <span className="text-[10px] text-outline pt-0.5">{book.lastReadTime}</span>
                        )}
                      </div>
                    </div>

                    {/* Progress & CTA */}
                    <div className="pt-3 mt-2 border-t border-surface-container-high/60 flex flex-col gap-2">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-primary font-semibold">{book.progressPercent}%</span>
                        <span className="text-outline">
                          p. {book.currentPage} of {book.totalPages}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                        <div
                          className="h-full bg-primary-container rounded-full"
                          style={{ width: `${book.progressPercent}%` }}
                        />
                      </div>

                      <button
                        onClick={() => onNavigate('reader')}
                        className="mt-1 w-full py-1.5 px-3 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-center text-xs font-semibold transition-colors"
                      >
                        {book.status === 'finished' ? 'Read Again' : 'Read Now'}
                      </button>
                    </div>

                    {/* Action Menu */}
                    {menuBookId === book.id && (
                      <div className="absolute right-3 top-12 z-30 w-48 bg-surface-container-lowest rounded-xl shadow-xl p-1.5 flex flex-col text-xs border border-surface-container-high">
                        <button
                          onClick={() => {
                            onUpdateBookStatus(book.id, 'finished');
                            setMenuBookId(null);
                          }}
                          className="px-3 py-1.5 rounded-lg hover:bg-surface-container text-left flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[16px]">check_circle</span>
                          <span>Mark as Finished</span>
                        </button>
                        <button
                          onClick={() => {
                            onOpenShareModal(
                              `Currently reading ${book.title}`,
                              book.title,
                              book.author
                            );
                            setMenuBookId(null);
                          }}
                          className="px-3 py-1.5 rounded-lg hover:bg-surface-container text-left flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[16px]">ios_share</span>
                          <span>Create Share Card</span>
                        </button>
                        <button
                          onClick={() => {
                            onNavigate('curation');
                            setMenuBookId(null);
                          }}
                          className="px-3 py-1.5 rounded-lg hover:bg-surface-container text-left flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[16px]">drive_file_move</span>
                          <span>Add to Custom Shelf</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* List Mode */
              <div className="flex flex-col gap-3">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className="flex items-center gap-4 bg-surface-container-lowest p-3.5 rounded-xl shadow-xs border border-surface-container-high/60 hover:shadow-sm transition-all"
                  >
                    <div className="w-12 h-18 rounded-lg overflow-hidden bg-surface-container shrink-0">
                      <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                          {book.genre}
                        </span>
                        <span className="text-xs text-outline font-medium">★ {book.rating}</span>
                      </div>
                      <h4 className="font-semibold text-sm text-on-surface truncate mt-0.5">
                        {book.title}
                      </h4>
                      <p className="text-xs text-on-surface-variant">{book.author}</p>
                    </div>

                    <div className="w-32 hidden sm:flex flex-col gap-1">
                      <div className="flex justify-between text-[11px] text-outline">
                        <span>{book.progressPercent}%</span>
                        <span>{book.currentPage}p</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                        <div
                          className="h-full bg-primary-container rounded-full"
                          style={{ width: `${book.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate('reader')}
                      className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold shrink-0"
                    >
                      Read
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between py-3 text-xs text-on-surface-variant">
              <span>Showing {filteredBooks.length} of 48 books</span>
              <div className="flex items-center gap-1.5">
                <button className="px-3 py-1 rounded-lg bg-surface-container text-outline cursor-not-allowed">
                  Previous
                </button>
                <span className="px-2.5 py-1 rounded-lg bg-primary text-on-primary font-bold">1</span>
                <button className="px-2.5 py-1 rounded-lg hover:bg-surface-container">2</button>
                <button className="px-2.5 py-1 rounded-lg hover:bg-surface-container">3</button>
                <button className="px-3 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Telemetry & Aside Widgets (3 cols) */}
          <aside className="xl:col-span-3 flex flex-col gap-4">
            {/* 2024 Reading Challenge Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container-high/60 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-on-surface">Reading Challenge</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                  2024
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-surface-container-high"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    />
                    <path
                      className="text-primary stroke-current"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeDasharray="72, 100"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <span className="absolute font-bold text-sm text-primary">18</span>
                </div>
                <div>
                  <p className="font-semibold text-xs text-on-surface">18 of 25 Books read</p>
                  <p className="text-[11px] text-on-surface-variant">72% of goal completed</p>
                  <span className="text-secondary text-[11px] font-medium flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[13px]">trending_up</span>
                    <span>2 books ahead of pace</span>
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t border-surface-container-high text-xs flex justify-between text-outline">
                <span>Target: Dec 31, 2024</span>
                <span className="text-primary cursor-pointer hover:underline">Adjust</span>
              </div>
            </div>

            {/* Custom Shelves List */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container-high/60 flex flex-col gap-2.5">
              <div className="flex items-center justify-between pb-1">
                <h3 className="font-semibold text-xs text-on-surface">Custom Shelves</h3>
                <button
                  onClick={() => onNavigate('curation')}
                  className="w-6 h-6 rounded-full bg-surface-container-high hover:bg-surface-container flex items-center justify-center text-primary"
                  title="New Shelf"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>

              <div className="flex flex-col gap-2 text-xs">
                {[
                  { name: 'Autumn Cozy Reads', count: '8 books', icon: 'folder', color: 'text-primary' },
                  { name: 'Philosophy & Mind', count: '12 books', icon: 'psychology', color: 'text-secondary' },
                  { name: 'Book Club 2024', count: '6 books • 4 active', icon: 'group', color: 'text-tertiary' },
                  { name: 'Re-read Favorites', count: '15 books', icon: 'archive', color: 'text-outline' },
                ].map((shelf, i) => (
                  <div
                    key={i}
                    onClick={() => onNavigate('curation')}
                    className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined text-[18px] ${shelf.color}`}>
                        {shelf.icon}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-semibold text-on-surface">{shelf.name}</span>
                        <span className="text-[10px] text-outline">{shelf.count}</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[16px]">chevron_right</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Offline Storage & Sync Panel */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container-high/60 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-xs text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px] text-primary">cloud_download</span>
                  <span>Offline Storage</span>
                </h3>
                <span className="text-[11px] text-secondary font-semibold">Ready</span>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                124 MB of 2.0 GB allocated browser cache used for 14 downloaded titles.
              </p>
              <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden my-1">
                <div className="h-full bg-secondary-container" style={{ width: '14%' }} />
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-outline">IndexedDB Cache</span>
                <button
                  onClick={handleClearCache}
                  className="text-[11px] text-primary hover:underline font-semibold"
                >
                  {cacheCleared ? 'Cache Cleared ✓' : 'Clear Cache'}
                </button>
              </div>
            </div>

            {/* Weekly Reading Pace */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container-high/60 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-on-surface">Weekly Reading Pace</span>
                <span className="font-serif font-bold text-sm text-primary">
                  42m <span className="font-sans text-[11px] text-outline font-normal">/day</span>
                </span>
              </div>
              <div className="w-full h-10 flex items-end">
                <svg className="w-full h-8 overflow-visible" viewBox="0 0 200 40">
                  <path
                    className="text-primary-container"
                    d="M 0,32 Q 30,35 60,18 T 120,24 T 170,8 T 200,14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                  <circle className="fill-primary" cx="60" cy="18" r="3" />
                  <circle className="fill-primary" cx="120" cy="24" r="3" />
                  <circle className="fill-primary" cx="170" cy="8" r="3.5" />
                </svg>
              </div>
              <div className="flex justify-between text-[10px] text-outline pt-1 border-t border-surface-container-high">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
                <span>Sun (Today)</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Add New Book Modal */}
      {isAddBookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-6 shadow-xl border border-surface-container-high">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl text-on-surface font-semibold">Add Book to Library</h3>
              <button
                onClick={() => setIsAddBookModalOpen(false)}
                className="text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleAddNewBook} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-outline uppercase font-semibold mb-1">Book Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. The Overstory"
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-outline uppercase font-semibold mb-1">Author</label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Richard Powers"
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-outline uppercase font-semibold mb-1">Total Pages</label>
                  <input
                    type="number"
                    value={newPages}
                    onChange={(e) => setNewPages(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-outline uppercase font-semibold mb-1">Genre</label>
                  <select
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container-high text-on-surface focus:outline-none"
                  >
                    <option>Literary Fiction</option>
                    <option>Sci-Fi</option>
                    <option>Fantasy</option>
                    <option>Philosophy</option>
                    <option>Non-Fiction</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddBookModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-semibold"
                >
                  Save to Library
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
