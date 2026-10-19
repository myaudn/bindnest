import React, { useState } from 'react';
import { ViewType } from '../types.ts';

interface ReaderViewProps {
  onNavigate: (view: ViewType) => void;
  onOpenShareModal: (quote?: string, book?: string, author?: string) => void;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  onNavigate,
  onOpenShareModal,
}) => {
  // Reading Customization State
  const [typeface, setTypeface] = useState<'merriweather' | 'playfair' | 'inter' | 'hyperlegible'>('merriweather');
  const [fontSize, setFontSize] = useState<number>(18);
  const [lineSpacing, setLineSpacing] = useState<'1.4' | '1.6' | '1.8'>('1.6');
  const [columnWidth, setColumnWidth] = useState<'680' | '820' | 'full'>('680');
  const [palette, setPalette] = useState<'linen' | 'sepia' | 'charcoal' | 'oled'>('linen');
  const [isJustified, setIsJustified] = useState<boolean>(true);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(true);
  const [highlightColor, setHighlightColor] = useState<string>('#fca5a5');

  // Modals
  const [isDisplaySettingsOpen, setIsDisplaySettingsOpen] = useState<boolean>(false);
  const [isTocOpen, setIsTocOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [readerSearchTerm, setReaderSearchTerm] = useState<string>('');

  // Chapter Navigation State
  const [currentChapter, setCurrentChapter] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(278);
  const totalPages = 416;

  const currentQuotePassage =
    '“To allow yourself to play with another person is no small risk. It means allowing yourself to be open, to be exposed, to be hurt. To be the player who makes the wrong move and lets the team lose.”';

  // Palette styling values
  const getPaletteTheme = () => {
    switch (palette) {
      case 'sepia':
        return {
          bg: '#f4ecd8',
          text: '#4a3f35',
          cardBg: '#ede1c5',
          border: 'border-[#dfd1b3]',
          subtext: '#766757',
        };
      case 'charcoal':
        return {
          bg: '#252525',
          text: '#eae8e4',
          cardBg: '#2f2f2f',
          border: 'border-[#3f3f3f]',
          subtext: '#a6a29d',
        };
      case 'oled':
        return {
          bg: '#000000',
          text: '#ffffff',
          cardBg: '#121212',
          border: 'border-[#222222]',
          subtext: '#888888',
        };
      default:
        return {
          bg: '#fbf9f5',
          text: '#1b1c1a',
          cardBg: '#ffffff',
          border: 'border-[#e4e2de]',
          subtext: '#54433b',
        };
    }
  };

  const pTheme = getPaletteTheme();

  const getFontFamilyClass = () => {
    switch (typeface) {
      case 'playfair':
        return 'font-serif';
      case 'inter':
        return 'font-sans';
      case 'hyperlegible':
        return 'font-sans tracking-wide';
      default:
        return 'font-serif';
    }
  };

  const getColumnWidthClass = () => {
    switch (columnWidth) {
      case '820':
        return 'max-w-[820px]';
      case 'full':
        return 'max-w-4xl';
      default:
        return 'max-w-[700px]';
    }
  };

  return (
    <div
      style={{ backgroundColor: pTheme.bg, color: pTheme.text }}
      className="min-h-screen transition-colors duration-300 pb-36 select-text"
    >
      {/* Sub-Header Navigation Bar */}
      <aside
        style={{ backgroundColor: pTheme.cardBg }}
        className="sticky top-20 z-40 w-full backdrop-blur-md shadow-xs border-b border-surface-container-high/60 transition-colors"
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-12 h-14 flex items-center justify-between gap-4">
          {/* Left Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={() => onNavigate('my-library')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors group"
            >
              <span className="material-symbols-outlined text-[19px] group-hover:-translate-x-0.5 transition-transform">
                arrow_back
              </span>
              <span className="hidden sm:inline">Library</span>
            </button>
            <div className="h-4 w-px bg-surface-container-high" />
            <button
              onClick={() => setIsTocOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[19px]">menu_book</span>
              <span className="hidden md:inline">Contents</span>
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="relative inline-flex items-center justify-center w-8 h-8 rounded-lg text-tertiary-container hover:bg-surface-container transition-colors"
              title={isBookmarked ? 'Bookmark saved' : 'Add bookmark'}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isBookmarked ? 'bookmark' : 'bookmark_border'}
              </span>
              {isBookmarked && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-tertiary-container" />}
            </button>
          </div>

          {/* Center Book Spine */}
          <div className="flex-1 min-w-0 text-center px-2 hidden sm:block">
            <p className="font-serif text-xs font-semibold truncate">
              Gabrielle Zevin <span className="text-outline mx-1.5">—</span> Tomorrow, and Tomorrow, and Tomorrow
            </p>
            <p className="text-[11px] text-outline truncate">
              Chapter {currentChapter}: The Journey Begins
            </p>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
              title="Search in book"
            >
              <span className="material-symbols-outlined text-[19px]">find_in_page</span>
            </button>
            <button
              onClick={() => setIsDisplaySettingsOpen(!isDisplaySettingsOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary text-xs font-semibold shadow-xs hover:opacity-95 transition-all"
            >
              <span className="material-symbols-outlined text-[17px]">format_size</span>
              <span>Aa</span>
              <span className="material-symbols-outlined text-[15px]">
                {isDisplaySettingsOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </div>
        </div>

        {/* Search in Book Expandable Input */}
        {isSearchOpen && (
          <div className="px-4 py-2 bg-surface-container-low border-t border-surface-container-high flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-outline">search</span>
            <input
              type="text"
              value={readerSearchTerm}
              onChange={(e) => setReaderSearchTerm(e.target.value)}
              placeholder="Find phrase or character in this chapter..."
              className="w-full bg-transparent text-xs text-on-surface focus:outline-none"
            />
            {readerSearchTerm && (
              <span className="text-[10px] text-secondary font-semibold shrink-0">3 matches found</span>
            )}
            <button onClick={() => setIsSearchOpen(false)} className="text-outline hover:text-on-surface text-xs">
              Close
            </button>
          </div>
        )}
      </aside>

      {/* Main Prose Canvas */}
      <div className="relative w-full flex justify-center px-4 sm:px-8 py-10">
        <main
          className={`w-full ${getColumnWidthClass()} transition-all duration-300`}
        >
          {/* Chapter Heading Treatment */}
          <header className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-outline-variant" />
              <span className="text-xs uppercase tracking-widest text-primary font-bold">
                Act II • Boston, 1996
              </span>
              <span className="h-px w-6 bg-outline-variant" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl tracking-tight mb-2 font-normal">
              Chapter {currentChapter}: The Journey Begins
            </h1>
            <p className="text-xs text-outline italic">Approx. reading time: 14 mins · 2,890 words</p>
          </header>

          {/* Literary Prose */}
          <article
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: lineSpacing === '1.4' ? '1.5' : lineSpacing === '1.8' ? '2.0' : '1.75',
              textAlign: isJustified ? 'justify' : 'left',
            }}
            className={`space-y-6 ${getFontFamilyClass()}`}
          >
            <p>
              <span className="float-left text-primary font-serif text-6xl leading-[48px] pt-1 pr-3 font-normal select-none">
                T
              </span>
              here is a time at the beginning of all things when you do not yet know the rules, and it is in that
              brief gap of ignorance that games can be genuinely magnificent. Sam Masur held the floppy disk between
              two fingertips like a communion wafer. Outside the hospital window, Cambridge was enduring a slush-gray
              December afternoon that smelled faintly of salt and roasting chestnuts.
            </p>

            {/* Highlighted Passage with Action Toolbar */}
            <div className="relative group my-8">
              {/* Text Selection Floating Toolbar */}
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 p-1.5 rounded-xl bg-surface-container-lowest shadow-xl border border-surface-container-high">
                {/* Palette Swatches */}
                <div className="flex items-center gap-1 px-1">
                  {[
                    { color: '#fca5a5', name: 'Terracotta' },
                    { color: '#fde047', name: 'Amber' },
                    { color: '#86efac', name: 'Sage' },
                    { color: '#93c5fd', name: 'Indigo' },
                  ].map((sw) => (
                    <button
                      key={sw.name}
                      onClick={() => setHighlightColor(sw.color)}
                      style={{ backgroundColor: sw.color }}
                      className={`w-5 h-5 rounded-full transition-transform hover:scale-110 ${
                        highlightColor === sw.color ? 'ring-2 ring-primary scale-110' : ''
                      }`}
                      title={sw.name}
                    />
                  ))}
                </div>
                <div className="h-4 w-px bg-surface-container-high" />

                {/* Contextual Actions */}
                <button
                  onClick={() =>
                    onOpenShareModal(
                      'There is a time at the beginning of all things when you do not yet know the rules, and it is in that brief gap of ignorance that games can be genuinely magnificent.',
                      'Tomorrow, and Tomorrow, and Tomorrow',
                      'Gabrielle Zevin'
                    )
                  }
                  className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-surface-container text-xs font-semibold text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[15px] text-tertiary">bookmark_add</span>
                  <span>Quote</span>
                </button>
                <button
                  onClick={() =>
                    onOpenShareModal(
                      'To play a game with someone is to trust them with your imagination.',
                      'Tomorrow, and Tomorrow, and Tomorrow',
                      'Gabrielle Zevin'
                    )
                  }
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary-container/60 text-on-secondary-container hover:bg-secondary-container text-xs font-semibold transition-colors"
                >
                  <span className="material-symbols-outlined text-[15px]">share</span>
                  <span>Card</span>
                </button>
              </div>

              {/* Highlighted Passage */}
              <mark
                style={{
                  backgroundColor: `${highlightColor}50`,
                  color: 'inherit',
                  boxShadow: `0 0 0 2px ${highlightColor}60`,
                }}
                className="px-1 py-0.5 rounded transition-colors"
              >
                "There is a time at the beginning of all things when you do not yet know the rules, and it is in
                that brief gap of ignorance that games can be genuinely magnificent. To play a game with someone is
                to trust them with your imagination."
              </mark>
            </div>

            <p>
              Sadie had not arrived yet. When she did, she carried two paper cups of cafeteria tea and a damp wool coat
              that she shed like an unwanted animal skin. She didn’t apologize for being late because their unspoken
              compact since age eleven had never required apologies for lateness; it only required absolute immersion
              once present.
            </p>

            {/* Embedded Quote Callout */}
            <blockquote
              style={{ backgroundColor: pTheme.cardBg }}
              className="my-8 p-5 rounded-2xl shadow-xs border border-surface-container-high/60 relative"
            >
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-primary text-[28px] select-none flex-shrink-0">
                  format_quote
                </span>
                <div className="space-y-1">
                  <p className="font-serif italic text-base leading-relaxed">
                    To allow someone into your play-space was harder than showing them your bedroom. The bedroom only
                    showed your past; the game showed who you were willing to become.
                  </p>
                  <footer className="text-xs text-outline not-italic pt-1">
                    — Marginalia note by <span className="text-primary font-semibold">Elena Vance</span> · 2 days ago
                  </footer>
                </div>
              </div>
            </blockquote>

            <p>
              "Show me the collision loop," she said immediately, leaning over his shoulder. Her hair smelled of cold
              rain and lemon lozenges. Sam pushed the keyboard toward her, feeling the old, familiar static charge that
              passed between two brains that had learned to speak the same private binary code before they had learned
              to speak to anyone else.
            </p>

            <p>
              The pixelated avatar flickered on the CRT monitor—a tiny figure dressed in yellow, hovering over an abyss
              rendered in eighteen shades of lavender. It was simple, crude by modern standards, yet the trajectory of
              the leap possessed a buoyant physics that felt less like code and more like human optimism given math.
            </p>

            <p>
              “If we fail,” he whispered, not to Sadie, but to the condensation pooling on the lower pane, “we will
              simply make another world. That is the only promise that actually matters: infinite continues.”
            </p>
          </article>

          {/* Floral Divider */}
          <div className="my-14 flex items-center justify-center gap-4 text-outline-variant">
            <span className="h-px w-16 bg-surface-container-high" />
            <span className="material-symbols-outlined text-[20px] text-primary/70">auto_stories</span>
            <span className="h-px w-16 bg-surface-container-high" />
          </div>

          {/* Footnote */}
          <footer
            style={{ backgroundColor: pTheme.cardBg }}
            className="p-4 rounded-xl flex items-start gap-3 border border-surface-container-high/60"
          >
            <span className="material-symbols-outlined text-outline text-[18px] mt-0.5">info</span>
            <div className="text-xs leading-relaxed text-on-surface-variant">
              <span className="font-semibold text-on-surface">Historical Note:</span> The MIT Media Lab games
              referenced here reflect the experimental software labs active during the winter semester of 1996 in
              Building E15.
            </div>
          </footer>
        </main>
      </div>

      {/* Floating Display Settings Modal */}
      {isDisplaySettingsOpen && (
        <section
          style={{ backgroundColor: pTheme.cardBg }}
          className="fixed right-4 md:right-12 top-36 z-50 w-full max-w-[360px] rounded-2xl shadow-2xl border border-surface-container-high overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container-high">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
              <h2 className="font-semibold text-sm text-on-surface">Display Settings</h2>
            </div>
            <button
              onClick={() => setIsDisplaySettingsOpen(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div className="p-5 space-y-5 max-h-[72vh] overflow-y-auto text-xs">
            {/* 1. Typeface */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-outline font-semibold mb-2">
                Typeface
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTypeface('merriweather')}
                  className={`p-2.5 rounded-xl text-left border ${
                    typeface === 'merriweather'
                      ? 'bg-primary-fixed/20 border-primary text-primary font-bold shadow-xs'
                      : 'bg-surface-container-low border-surface-container-high text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <div className="font-serif text-sm">Merriweather</div>
                  <span className="text-[10px] text-outline">Warm Serif</span>
                </button>

                <button
                  onClick={() => setTypeface('playfair')}
                  className={`p-2.5 rounded-xl text-left border ${
                    typeface === 'playfair'
                      ? 'bg-primary-fixed/20 border-primary text-primary font-bold shadow-xs'
                      : 'bg-surface-container-low border-surface-container-high text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <div className="font-serif text-sm">Playfair</div>
                  <span className="text-[10px] text-outline">Editorial</span>
                </button>

                <button
                  onClick={() => setTypeface('inter')}
                  className={`p-2.5 rounded-xl text-left border ${
                    typeface === 'inter'
                      ? 'bg-primary-fixed/20 border-primary text-primary font-bold shadow-xs'
                      : 'bg-surface-container-low border-surface-container-high text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <div className="font-sans text-sm font-semibold">Inter Sans</div>
                  <span className="text-[10px] text-outline">Clean Geometric</span>
                </button>

                <button
                  onClick={() => setTypeface('hyperlegible')}
                  className={`p-2.5 rounded-xl text-left border ${
                    typeface === 'hyperlegible'
                      ? 'bg-primary-fixed/20 border-primary text-primary font-bold shadow-xs'
                      : 'bg-surface-container-low border-surface-container-high text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <div className="font-sans text-sm font-semibold">Hyperlegible</div>
                  <span className="text-[10px] text-outline">Accessible</span>
                </button>
              </div>
            </div>

            {/* 2. Font Size */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wider text-outline font-semibold">Font Size</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-mono text-[11px] font-bold">
                  {fontSize} px
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFontSize(Math.max(14, fontSize - 1))}
                  className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center font-bold text-xs"
                >
                  A-
                </button>
                <input
                  type="range"
                  min="14"
                  max="28"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container-high rounded-lg cursor-pointer"
                />
                <button
                  onClick={() => setFontSize(Math.min(28, fontSize + 1))}
                  className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center font-bold text-sm"
                >
                  A+
                </button>
              </div>
            </div>

            {/* 3. Line Spacing */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-outline font-semibold mb-2">
                Line Spacing
              </label>
              <div className="grid grid-cols-3 gap-1.5 bg-surface-container-low p-1 rounded-xl">
                {(['1.4', '1.6', '1.8'] as const).map((space) => (
                  <button
                    key={space}
                    onClick={() => setLineSpacing(space)}
                    className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      lineSpacing === space
                        ? 'bg-surface-container-lowest text-primary shadow-xs'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {space} {space === '1.4' ? 'Compact' : space === '1.6' ? 'Relaxed' : 'Generous'}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Column Width */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-outline font-semibold mb-2">
                Page Column Width
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['680', '820', 'full'] as const).map((width) => (
                  <button
                    key={width}
                    onClick={() => setColumnWidth(width)}
                    className={`py-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border ${
                      columnWidth === width
                        ? 'bg-primary-fixed/20 border-primary text-primary shadow-xs'
                        : 'bg-surface-container-low border-surface-container-high text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      {width === '680' ? 'format_align_center' : width === '820' ? 'view_column' : 'width_full'}
                    </span>
                    <span>{width === '680' ? '680 px' : width === '820' ? '820 px' : 'Full'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Reading Palette */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-outline font-semibold mb-2">
                Reading Palette
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'linen', name: 'Linen', bg: '#fbf9f5', border: '#e4e2de' },
                  { id: 'sepia', name: 'Sepia', bg: '#ede1c5', border: '#dfd1b3' },
                  { id: 'charcoal', name: 'Charcoal', bg: '#2f2f2f', border: '#3f3f3f' },
                  { id: 'oled', name: 'OLED', bg: '#111111', border: '#222222' },
                ].map((pal) => (
                  <button
                    key={pal.id}
                    onClick={() => setPalette(pal.id as 'linen' | 'sepia' | 'charcoal' | 'oled')}
                    className={`p-2 rounded-xl flex flex-col items-center gap-1 border transition-all ${
                      palette === pal.id ? 'ring-2 ring-primary shadow-xs' : 'border-surface-container-high'
                    }`}
                    style={{ backgroundColor: pal.bg }}
                  >
                    <div
                      className="w-6 h-6 rounded-full border border-black/10 flex items-center justify-center"
                      style={{ backgroundColor: pal.bg }}
                    >
                      {palette === pal.id && (
                        <span className="material-symbols-outlined text-primary text-[14px]">check</span>
                      )}
                    </div>
                    <span className="text-[10px] font-semibold text-on-surface">{pal.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Switches */}
            <div className="pt-2 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface">Justify text paragraphs</span>
                <button
                  type="button"
                  onClick={() => setIsJustified(!isJustified)}
                  className={`w-9 h-5 rounded-full relative transition-colors ${
                    isJustified ? 'bg-primary' : 'bg-surface-container-high'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 bg-white rounded-full transition-transform ${
                      isJustified ? 'translate-x-4' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 bg-surface-container-low flex items-center justify-between border-t border-surface-container-high text-xs">
            <button
              onClick={() => {
                setTypeface('merriweather');
                setFontSize(18);
                setLineSpacing('1.6');
                setColumnWidth('680');
                setPalette('linen');
                setIsJustified(true);
              }}
              className="text-outline hover:text-primary transition-colors"
            >
              Reset to Default
            </button>
            <span className="text-[10px] text-outline font-mono">Bindnest Engine v3.4</span>
          </div>
        </section>
      )}

      {/* Table of Contents Modal */}
      {isTocOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-6 shadow-xl border border-surface-container-high max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-surface-container-high">
              <div>
                <h3 className="font-serif text-lg font-bold text-on-surface">Table of Contents</h3>
                <p className="text-xs text-outline">Tomorrow, and Tomorrow, and Tomorrow</p>
              </div>
              <button onClick={() => setIsTocOpen(false)} className="text-outline hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="overflow-y-auto space-y-2 text-xs">
              {[
                { ch: 1, title: 'Sick Child', page: 12 },
                { ch: 2, title: 'Infinitive', page: 48 },
                { ch: 3, title: 'Ichigo', page: 94 },
                { ch: 4, title: 'The Unrealized World', page: 140 },
                { ch: 5, title: 'The Journey Begins', page: 186 },
                { ch: 6, title: 'Pioneers of the Pixel', page: 221 },
                { ch: 7, title: 'Tokyo Winter', page: 254 },
                { ch: 8, title: 'The Unfair Game', page: 274 },
                { ch: 9, title: 'Our Infinite Continues', page: 340 },
                { ch: 10, title: 'Epilogue: Player Two', page: 398 },
              ].map((c) => (
                <div
                  key={c.ch}
                  onClick={() => {
                    setCurrentChapter(c.ch);
                    setCurrentPage(c.page);
                    setIsTocOpen(false);
                  }}
                  className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                    currentChapter === c.ch
                      ? 'bg-primary-fixed/20 text-primary font-bold'
                      : 'hover:bg-surface-container text-on-surface'
                  }`}
                >
                  <span>
                    Chapter {c.ch}: {c.title}
                  </span>
                  <span className="text-outline text-[11px]">p. {c.page}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Reader Footer Controls */}
      <footer
        style={{ backgroundColor: pTheme.cardBg }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-[840px] rounded-2xl shadow-xl p-3 px-4 sm:px-6 border border-surface-container-high/60 transition-all duration-300"
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          {/* Previous Chapter */}
          <button
            onClick={() => {
              if (currentChapter > 1) {
                setCurrentChapter(currentChapter - 1);
                setCurrentPage(Math.max(1, currentPage - 35));
              }
            }}
            className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary hover:bg-surface-container px-2 py-1 rounded-lg text-xs font-semibold transition-colors flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[17px]">chevron_left</span>
            <span className="hidden sm:inline">Chapter {currentChapter - 1}</span>
          </button>

          {/* Chapter Status */}
          <div className="flex flex-col items-center text-center truncate px-2">
            <span className="font-serif font-bold text-xs text-on-surface truncate">
              Chapter {currentChapter}: The Journey Begins
            </span>
            <div className="flex items-center gap-2 text-outline text-[11px]">
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <span>•</span>
              <span className="text-secondary font-medium">12 mins left</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline font-mono">245 wpm</span>
            </div>
          </div>

          {/* Next Chapter */}
          <button
            onClick={() => {
              if (currentChapter < 10) {
                setCurrentChapter(currentChapter + 1);
                setCurrentPage(Math.min(totalPages, currentPage + 35));
              }
            }}
            className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary hover:bg-surface-container px-2 py-1 rounded-lg text-xs font-semibold transition-colors flex-shrink-0"
          >
            <span className="hidden sm:inline">Chapter {currentChapter + 1}</span>
            <span className="material-symbols-outlined text-[17px]">chevron_right</span>
          </button>
        </div>

        {/* Scrubber Progress Slider */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-outline font-mono">
            {Math.round((currentPage / totalPages) * 100)}%
          </span>
          <input
            type="range"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => setCurrentPage(parseInt(e.target.value))}
            className="w-full accent-primary h-1.5 bg-surface-container-high rounded-full cursor-pointer"
          />
          <span className="text-[11px] text-outline font-mono">100%</span>
        </div>
      </footer>
    </div>
  );
};
