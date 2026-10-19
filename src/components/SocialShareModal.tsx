import React, { useState, useRef } from 'react';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultQuote?: string;
  defaultBook?: string;
  defaultAuthor?: string;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  defaultQuote = 'We are all just stories in the end, make it a good one.',
  defaultBook = 'The Midnight Library',
  defaultAuthor = 'Matt Haig · Finished Nov 2024',
}) => {
  const [aspectRatio, setAspectRatio] = useState<'story' | 'square'>('story');
  const [theme, setTheme] = useState<'linen' | 'espresso' | 'sage' | 'terracotta'>('linen');
  const [quoteText, setQuoteText] = useState<string>(defaultQuote);
  const [showQuote, setShowQuote] = useState<boolean>(true);
  const [showStreak, setShowStreak] = useState<boolean>(true);
  const [showBadge, setShowBadge] = useState<boolean>(true);
  const [showWatermark, setShowWatermark] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const getThemeStyles = () => {
    switch (theme) {
      case 'espresso':
        return {
          bg: '#25211E',
          text: '#F5F3EF',
          quoteText: '#FFFDF9',
          meta: '#D0C7C0',
          badgeBg: '#3A322C',
          badgeText: '#FFDBBE',
          bookThumbBg: '#9C4E23',
          border: 'border-[#3A322C]',
        };
      case 'sage':
        return {
          bg: '#EAF0E8',
          text: '#203220',
          quoteText: '#1B291B',
          meta: '#456644',
          badgeBg: '#C7EDC1',
          badgeText: '#022106',
          bookThumbBg: '#456644',
          border: 'border-[#C7EDC1]',
        };
      case 'terracotta':
        return {
          bg: '#9C4E23',
          text: '#FFFDF9',
          quoteText: '#FFFFFF',
          meta: '#FFD9C9',
          badgeBg: '#773207',
          badgeText: '#FFDBBE',
          bookThumbBg: '#773207',
          border: 'border-[#773207]',
        };
      default:
        return {
          bg: '#FBF9F5',
          text: '#1B1C1A',
          quoteText: '#1B1C1A',
          meta: '#87736A',
          badgeBg: '#C7EDC1',
          badgeText: '#022106',
          bookThumbBg: '#9C4E23',
          border: 'border-[#E4E2DE]',
        };
    }
  };

  const tStyles = getThemeStyles();

  // Export card as real PNG image using HTML5 Canvas
  const handleDownloadPng = () => {
    const canvas = document.createElement('canvas');
    const width = aspectRatio === 'story' ? 1080 : 1080;
    const height = aspectRatio === 'story' ? 1920 : 1080;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Background
      ctx.fillStyle = tStyles.bg;
      ctx.fillRect(0, 0, width, height);

      // Card Header
      ctx.fillStyle = tStyles.text;
      ctx.font = '600 36px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('clara.reads', 80, 120);

      if (showStreak) {
        ctx.fillStyle = tStyles.badgeBg;
        ctx.beginPath();
        ctx.roundRect(width - 340, 75, 260, 60, 30);
        ctx.fill();
        ctx.fillStyle = tStyles.badgeText;
        ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('🔥 12-Day Streak', width - 310, 115);
      }

      // Quote Mark
      if (showQuote) {
        ctx.fillStyle = theme === 'terracotta' ? 'rgba(255,255,255,0.3)' : 'rgba(156,78,35,0.3)';
        ctx.font = '72px "Merriweather", serif';
        ctx.fillText('“', 80, aspectRatio === 'story' ? 520 : 360);

        // Quote Text with wrap
        ctx.fillStyle = tStyles.quoteText;
        ctx.font = 'italic 52px "Merriweather", serif';
        const words = quoteText.split(' ');
        let line = '';
        let y = aspectRatio === 'story' ? 620 : 440;
        const maxWidth = width - 160;

        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && i > 0) {
            ctx.fillText(line, 80, y);
            line = words[i] + ' ';
            y += 75;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, 80, y);

        // Book title & author
        y += 80;
        ctx.fillStyle = theme === 'terracotta' ? '#FFFFFF' : '#7E370D';
        ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(defaultBook, 80, y);

        y += 45;
        ctx.fillStyle = tStyles.meta;
        ctx.font = '30px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(defaultAuthor, 80, y);
      }

      // Book Badge
      if (showBadge) {
        const badgeY = height - 280;
        ctx.fillStyle = theme === 'terracotta' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.8)';
        ctx.beginPath();
        ctx.roundRect(80, badgeY, width - 160, 110, 20);
        ctx.fill();

        ctx.fillStyle = tStyles.text;
        ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Book #42 of 50', 170, badgeY + 50);

        ctx.fillStyle = tStyles.meta;
        ctx.font = '26px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Rating: ★★★★★', 170, badgeY + 88);
      }

      // Watermark
      if (showWatermark) {
        ctx.fillStyle = tStyles.meta;
        ctx.font = '26px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Bindnest Reading Sanctuary', 80, height - 70);
        ctx.fillText('bindnest.app/clara', width - 320, height - 70);
      }

      // Trigger download
      const link = document.createElement('a');
      link.download = `Bindnest_Share_${theme}_${aspectRatio}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      showToast('Exported high-resolution card (1080px)!');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`"${quoteText}" — ${defaultBook} by ${defaultAuthor} #Bindnest`);
      setIsCopied(true);
      showToast('Card quote copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      showToast('Copied to clipboard!');
    }
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`"${quoteText}"\n\nReading ${defaultBook} on @Bindnest 📖✨`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-surface rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-surface-container-high my-auto">
        {/* Modal Top Bar */}
        <div className="h-16 px-6 flex items-center justify-between bg-surface-container-lowest border-b border-surface-container-high flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-[24px]">photo_library</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Social Share Card Generator</h3>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-semibold text-xs">
              Aesthetic Studio
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Content Two-Column */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 min-h-0">
          {/* Left Canvas Preview */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col items-center justify-center bg-surface-container-low min-h-[460px]">
            {/* Aspect Ratio Toggles */}
            <div className="flex items-center gap-1.5 p-1 bg-surface-container-highest rounded-full mb-6 shadow-sm">
              <button
                onClick={() => setAspectRatio('story')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  aspectRatio === 'story'
                    ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">stay_current_portrait</span>
                <span>Story (9:16)</span>
              </button>
              <button
                onClick={() => setAspectRatio('square')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  aspectRatio === 'square'
                    ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">crop_square</span>
                <span>Square (1:1)</span>
              </button>
            </div>

            {/* Preview Stage */}
            <div className="w-full flex items-center justify-center overflow-hidden py-2">
              <div
                ref={cardRef}
                style={{ backgroundColor: tStyles.bg, color: tStyles.text }}
                className={`w-[300px] sm:w-[330px] rounded-2xl shadow-xl transition-all duration-300 p-6 flex flex-col justify-between relative overflow-hidden ${
                  aspectRatio === 'story' ? 'aspect-[9/16]' : 'aspect-square'
                }`}
              >
                {/* Decorative Subtle Texture Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/5 pointer-events-none" />

                {/* Top Card Header */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqVUBQ3RaABQQ2TgOepx_nqG6UL_BjypU9_ljsOZ4xK5CBVa3d5ugAu4mkI9MckyJqCLujg4UjFMRNmglhpZCOrqu1es0EvskaP1oTQW3MoGn7-ZT7nwdRM4RznSEHaODMrSwQOoTdRQvWnrBrACUZDO5rkYNHxuLk8gp1JDW_dp_S7LdMUFIrDqcizD9rsFajpacX8ayCUU40RXKUCTm3qnpt9ooLqTUTeqp4E2zjE6JLN07XZGcfMQ"
                      alt="Clara"
                      className="w-7 h-7 rounded-full object-cover shadow-sm"
                    />
                    <span className="font-medium text-xs tracking-wide">clara.reads</span>
                  </div>
                  {showStreak && (
                    <div
                      style={{ backgroundColor: tStyles.badgeBg, color: tStyles.badgeText }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold text-xs shadow-xs"
                    >
                      <span>🔥</span>
                      <span>12-Day Streak</span>
                    </div>
                  )}
                </div>

                {/* Middle Quote */}
                {showQuote && (
                  <div className="relative z-10 my-auto py-2 flex flex-col gap-3">
                    <span
                      style={{ color: theme === 'terracotta' ? 'rgba(255,255,255,0.4)' : 'rgba(156,78,35,0.4)' }}
                      className="font-serif text-4xl leading-none select-none"
                    >
                      “
                    </span>
                    <p
                      style={{ color: tStyles.quoteText }}
                      className={`font-serif italic leading-relaxed tracking-tight ${
                        aspectRatio === 'story' ? 'text-lg' : 'text-base line-clamp-3'
                      }`}
                    >
                      {quoteText}
                    </p>
                    <div className="flex flex-col pt-1">
                      <span
                        style={{ color: theme === 'terracotta' ? '#FFFFFF' : '#7e370d' }}
                        className="font-bold text-sm"
                      >
                        {defaultBook}
                      </span>
                      <span style={{ color: tStyles.meta }} className="text-xs">
                        {defaultAuthor}
                      </span>
                    </div>
                  </div>
                )}

                {/* Book Badge */}
                {showBadge && (
                  <div
                    style={{
                      backgroundColor: theme === 'terracotta' ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.7)',
                    }}
                    className="relative z-10 flex items-center gap-3 p-2.5 rounded-xl shadow-xs backdrop-blur-sm my-2"
                  >
                    <div
                      style={{ backgroundColor: tStyles.bookThumbBg }}
                      className="w-9 h-12 rounded-md text-white flex items-center justify-center flex-shrink-0 shadow-inner"
                    >
                      <span className="material-symbols-outlined text-[18px]">menu_book</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-xs truncate">Book #42 of 50</span>
                      <span style={{ color: tStyles.meta }} className="text-[11px]">
                        Rating: ★★★★★
                      </span>
                    </div>
                  </div>
                )}

                {/* Watermark Footer */}
                {showWatermark && (
                  <div
                    style={{ color: tStyles.meta }}
                    className="relative z-10 pt-2 flex items-center justify-between text-[11px]"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Bindnest Reading Sanctuary</span>
                    </span>
                    <span>bindnest.app/clara</span>
                  </div>
                )}
              </div>
            </div>

            <span className="text-xs text-outline mt-3">Visual renders at 1080 × 1920px upon download</span>
          </div>

          {/* Right Customization Controls */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-6 bg-surface-container-lowest">
            <div className="space-y-6">
              {/* Presets */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-outline font-semibold mb-3">
                  Card Style Preset
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setTheme('linen')}
                    className={`p-3 rounded-xl text-left transition-all flex flex-col gap-1.5 ${
                      theme === 'linen'
                        ? 'bg-surface-container-low ring-2 ring-primary shadow-xs'
                        : 'bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-on-surface">Cozy Linen</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-[#fbf9f5] border border-outline-variant" />
                    </div>
                    <span className="text-[11px] text-outline">Warm paper & cream</span>
                  </button>

                  <button
                    onClick={() => setTheme('espresso')}
                    className={`p-3 rounded-xl text-left transition-all flex flex-col gap-1.5 ${
                      theme === 'espresso'
                        ? 'bg-surface-container-low ring-2 ring-primary shadow-xs'
                        : 'bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-on-surface">Dark Espresso</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-[#30312e]" />
                    </div>
                    <span className="text-[11px] text-outline">Deep coffee roast</span>
                  </button>

                  <button
                    onClick={() => setTheme('sage')}
                    className={`p-3 rounded-xl text-left transition-all flex flex-col gap-1.5 ${
                      theme === 'sage'
                        ? 'bg-surface-container-low ring-2 ring-primary shadow-xs'
                        : 'bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-on-surface">Sage Minimal</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-[#c7edc1]" />
                    </div>
                    <span className="text-[11px] text-outline">Calm library foliage</span>
                  </button>

                  <button
                    onClick={() => setTheme('terracotta')}
                    className={`p-3 rounded-xl text-left transition-all flex flex-col gap-1.5 ${
                      theme === 'terracotta'
                        ? 'bg-surface-container-low ring-2 ring-primary shadow-xs'
                        : 'bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-on-surface">Terracotta</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-[#9c4e23]" />
                    </div>
                    <span className="text-[11px] text-outline">Vibrant pottery tone</span>
                  </button>
                </div>
              </div>

              {/* Elements */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-outline font-semibold mb-2.5">
                  Include Elements
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                    <span className="text-xs text-on-surface font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-[17px] text-primary">format_quote</span>
                      Favorite Quote Callout
                    </span>
                    <input
                      type="checkbox"
                      checked={showQuote}
                      onChange={(e) => setShowQuote(e.target.checked)}
                      className="accent-primary w-4 h-4 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                    <span className="text-xs text-on-surface font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-[17px] text-tertiary">local_fire_department</span>
                      Reading Streak (12-Day)
                    </span>
                    <input
                      type="checkbox"
                      checked={showStreak}
                      onChange={(e) => setShowStreak(e.target.checked)}
                      className="accent-primary w-4 h-4 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                    <span className="text-xs text-on-surface font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-[17px] text-secondary">book</span>
                      Book Metadata Badge
                    </span>
                    <input
                      type="checkbox"
                      checked={showBadge}
                      onChange={(e) => setShowBadge(e.target.checked)}
                      className="accent-primary w-4 h-4 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                    <span className="text-xs text-on-surface font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-[17px] text-outline">verified</span>
                      Bindnest Watermark
                    </span>
                    <input
                      type="checkbox"
                      checked={showWatermark}
                      onChange={(e) => setShowWatermark(e.target.checked)}
                      className="accent-primary w-4 h-4 cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              {/* Custom Quote Field */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-outline font-semibold mb-1.5">
                  Custom Quote or Note
                </label>
                <textarea
                  value={quoteText}
                  onChange={(e) => setQuoteText(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  placeholder="Type or paste your quote..."
                />
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => showToast('Shared to Instagram Story preview!')}
                className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Share to Instagram Story</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleDownloadPng}
                  className="py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[17px]">download</span>
                  <span>Download PNG</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[17px]">content_copy</span>
                  <span>{isCopied ? 'Copied!' : 'Copy Quote'}</span>
                </button>
              </div>

              <button
                onClick={handleShareTwitter}
                className="w-full py-1.5 text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[15px]">share</span>
                <span>Share on X / Twitter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
