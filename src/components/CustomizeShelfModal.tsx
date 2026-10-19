import React, { useState } from 'react';
import { CustomShelfData } from '../types.ts';

interface CustomizeShelfModalProps {
  isOpen: boolean;
  onClose: () => void;
  shelf: CustomShelfData | null;
  onSave: (updatedShelf: CustomShelfData) => void;
  onDelete?: (shelfId: string) => void;
}

export const CustomizeShelfModal: React.FC<CustomizeShelfModalProps> = ({
  isOpen,
  onClose,
  shelf,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState(shelf?.title || 'Rainy Day Reads');
  const [description, setDescription] = useState(
    shelf?.description || 'Comforting, slow-burn novels with gentle pacing and warm tea vibes.'
  );
  const [theme, setTheme] = useState<'linen' | 'terracotta' | 'sage' | 'midnight' | 'leather'>(
    (shelf?.theme as any) || 'terracotta'
  );
  const [displayView, setDisplayView] = useState<'grid' | 'list'>('grid');
  const [privacy, setPrivacy] = useState<'public' | 'friends' | 'private'>(
    shelf?.accessType === 'public' ? 'public' : shelf?.accessType === 'friends' ? 'friends' : 'private'
  );

  const [booksList, setBooksList] = useState([
    {
      id: 'b1',
      title: 'Before the Coffee Gets Cold',
      author: 'Toshikazu Kawaguchi',
      cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLg42v2HTZYD95ONoSA5lUAbHYiuvXXnvNElmzmXsuLyR6_2WG5uBop1AQXge-H57vz4-ucsioEJB18ACzHyx4VqF94HfhdmgLkRi8n56md1nbNX3B944ar5sZCeThj41QXE1LkItqwuOdINn6qNQv7uVBIg3q9HFmRRMcBPlKJR3-FWfmpT7QA85yYk4p28JW_q5Zkw7t7pR33dBUvXHCbJhYIQvyyrjoDs4un8ImS43GF9RR6EYjyg',
      priority: 1,
    },
    {
      id: 'b2',
      title: 'The Housekeeper and the Professor',
      author: 'Yoko Ogawa',
      cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEG6MRi5tTARijsvlL_srAdcIOj6U22XFdzJav7UKs6vyc8oLVtW2iSotDbdGkAynHpFrUCSgdXPtUFcKP7TqksjGGhxKunBQZt0j4lLKM_xx_Dv-AL_VaVdakHt35pJltJh1bhVkjI9dF3toAQOEBtwELjMkujXrPLtx0-CLxmpKY2qCjGlwjMMraTSflTjEslsmhmELZ-Mf25uQYcq2_-RjjDFcAwPaX7J8uRpUV7Nv-8ZMBeZkAiA',
      priority: 2,
    },
    {
      id: 'b3',
      title: 'Foster',
      author: 'Claire Keegan',
      cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEAgeiniHY4NHVe1SjLFdJOTWJIoMXKONnn9aQsWFzOQmOuzijjuwQBlWrmDQ77P87p69N0qDib1hzzlzifTwiAu_7FIL1zXD3e9yPYXAK2tN4T27E3UOzasNv-ArXzqLwRembpkWreVNrDSuI7ICKsMtLw81Qz3OCTUB2riCnrHvE8S24HLviICe7hJuEhPaLTEVD2xX2q14d8CHb3h_ddH676VU7PZ8kaqsPr4iBeicd1u1XdpCNtg',
      priority: 3,
    },
  ]);

  if (!isOpen) return null;

  const handleRemoveBook = (id: string) => {
    setBooksList(booksList.filter((b) => b.id !== id));
  };

  const handleMovePriority = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= booksList.length) return;
    const newArr = [...booksList];
    const temp = newArr[index];
    newArr[index] = newArr[targetIdx];
    newArr[targetIdx] = temp;
    setBooksList(newArr.map((b, i) => ({ ...b, priority: i + 1 })));
  };

  const handleSave = () => {
    if (shelf) {
      onSave({
        ...shelf,
        title,
        description,
        theme,
        accessType: privacy,
        booksCount: booksList.length + 11,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm">
      <div className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-surface-container-low flex items-center justify-between border-b border-surface-container-high">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-[22px]">shelves</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Customize Shelf: “{title}”
              </h3>
              <p className="text-xs text-on-surface-variant">Update metadata, aesthetic theme & arrange queue</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Shelf Name & Description */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-outline font-semibold mb-1.5">
                Shelf Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low focus:bg-surface-container-lowest text-on-surface text-sm border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-outline font-semibold mb-1.5">
                Curator Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low focus:bg-surface-container-lowest text-on-surface text-sm border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              />
            </div>
          </div>

          {/* Aesthetic Theme */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-outline font-semibold mb-2">
              Shelf Aesthetic Theme
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              <button
                type="button"
                onClick={() => setTheme('linen')}
                className={`p-2.5 rounded-xl text-left text-xs transition-all flex flex-col gap-2 border ${
                  theme === 'linen'
                    ? 'bg-primary-fixed text-on-primary-fixed-variant ring-2 ring-primary border-primary font-semibold'
                    : 'bg-surface-container-low border-surface-container-high text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="w-full h-5 rounded-md bg-[#e7e1d8]" />
                <span>Linen Minimal</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('terracotta')}
                className={`p-2.5 rounded-xl text-left text-xs transition-all flex flex-col gap-2 border ${
                  theme === 'terracotta'
                    ? 'bg-primary-fixed text-on-primary-fixed-variant ring-2 ring-primary border-primary font-semibold'
                    : 'bg-surface-container-low border-surface-container-high text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="w-full h-5 rounded-md bg-primary" />
                <span>Terracotta</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('sage')}
                className={`p-2.5 rounded-xl text-left text-xs transition-all flex flex-col gap-2 border ${
                  theme === 'sage'
                    ? 'bg-primary-fixed text-on-primary-fixed-variant ring-2 ring-primary border-primary font-semibold'
                    : 'bg-surface-container-low border-surface-container-high text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="w-full h-5 rounded-md bg-secondary" />
                <span>Forest Sage</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('midnight')}
                className={`p-2.5 rounded-xl text-left text-xs transition-all flex flex-col gap-2 border ${
                  theme === 'midnight'
                    ? 'bg-primary-fixed text-on-primary-fixed-variant ring-2 ring-primary border-primary font-semibold'
                    : 'bg-surface-container-low border-surface-container-high text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="w-full h-5 rounded-md bg-[#252830]" />
                <span>Midnight Dark</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('leather')}
                className={`p-2.5 rounded-xl text-left text-xs transition-all flex flex-col gap-2 border ${
                  theme === 'leather'
                    ? 'bg-primary-fixed text-on-primary-fixed-variant ring-2 ring-primary border-primary font-semibold'
                    : 'bg-surface-container-low border-surface-container-high text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="w-full h-5 rounded-md bg-tertiary" />
                <span>Leather Bound</span>
              </button>
            </div>
          </div>

          {/* Display View & Privacy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div>
              <label className="block text-xs uppercase tracking-wider text-outline font-semibold mb-2">
                Display View
              </label>
              <div className="flex items-center gap-2 p-1 rounded-xl bg-surface-container-low border border-surface-container-high">
                <button
                  type="button"
                  onClick={() => setDisplayView('grid')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    displayView === 'grid'
                      ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">grid_view</span>
                  <span>Card Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDisplayView('list')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    displayView === 'list'
                      ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">view_list</span>
                  <span>Editorial List</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-outline font-semibold mb-2">
                Privacy Visibility
              </label>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs text-on-surface cursor-pointer">
                  <input
                    type="radio"
                    name="shelf-privacy"
                    checked={privacy === 'public'}
                    onChange={() => setPrivacy('public')}
                    className="accent-primary"
                  />
                  <span>🌐 Public (Community Discoverable)</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-on-surface cursor-pointer">
                  <input
                    type="radio"
                    name="shelf-privacy"
                    checked={privacy === 'friends'}
                    onChange={() => setPrivacy('friends')}
                    className="accent-primary"
                  />
                  <span>👥 Friends & Buddies Only</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-on-surface cursor-pointer">
                  <input
                    type="radio"
                    name="shelf-privacy"
                    checked={privacy === 'private'}
                    onChange={() => setPrivacy('private')}
                    className="accent-primary"
                  />
                  <span className={privacy === 'private' ? 'font-semibold text-primary' : ''}>
                    🔒 Only Me (Private)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Book Reordering */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs uppercase tracking-wider text-outline font-semibold">
                Books in Shelf (Reorder Priority)
              </label>
              <span className="text-xs text-outline">{booksList.length} shown of 14</span>
            </div>
            <div className="space-y-2">
              {booksList.map((book, idx) => (
                <div
                  key={book.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors border border-surface-container-high"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <button
                        onClick={() => handleMovePriority(idx, 'up')}
                        disabled={idx === 0}
                        aria-label="Move Up"
                        className="text-outline hover:text-on-surface disabled:opacity-20"
                      >
                        <span className="material-symbols-outlined text-[16px]">arrow_drop_up</span>
                      </button>
                      <button
                        onClick={() => handleMovePriority(idx, 'down')}
                        disabled={idx === booksList.length - 1}
                        aria-label="Move Down"
                        className="text-outline hover:text-on-surface disabled:opacity-20"
                      >
                        <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
                      </button>
                    </div>
                    <div className="w-8 h-11 rounded bg-surface-container overflow-hidden shrink-0 shadow-xs">
                      <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-xs text-on-surface leading-tight">{book.title}</h5>
                      <p className="text-[11px] text-on-surface-variant">{book.author}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        book.priority === 1
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-surface-container-high text-on-surface'
                      }`}
                    >
                      Priority {book.priority}
                    </span>
                    <button
                      onClick={() => handleRemoveBook(book.id)}
                      className="p-1 rounded-lg text-outline hover:text-error transition-colors"
                      title="Remove from shelf"
                    >
                      <span className="material-symbols-outlined text-[18px]">remove_circle_outline</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between border-t border-surface-container-high">
          <button
            onClick={() => {
              if (shelf && onDelete) onDelete(shelf.id);
              onClose();
            }}
            className="text-error hover:text-error/80 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
            <span>Delete Shelf</span>
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold shadow-xs transition-colors"
            >
              Save Shelf Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
