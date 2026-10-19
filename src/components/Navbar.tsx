import React, { useState } from 'react';
import { ViewType } from '../types.ts';
import { AmbientAudioPlayer } from './AmbientAudioPlayer.tsx';
import { BindnestLogoSimplified, BindnestWordmark } from './BindnestLogo.tsx';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onOpenShareModal: () => void;
  streakDays?: number;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenShareModal,
  streakDays = 12,
  searchQuery = '',
  onSearchChange = () => {},
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  const navItems: { key: ViewType; label: string }[] = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'my-library', label: 'My Library' },
    { key: 'reader', label: 'Reader' },
    { key: 'buddy-hub', label: 'Buddy Hub' },
    { key: 'curation', label: 'Curation' },
    { key: 'community', label: 'Community' },
    { key: 'stats-streaks', label: 'Stats & Streaks' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#fbf9f5]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(43,36,32,0.05)] border-b border-surface-container-high/60">
      <div className="h-20 max-w-[1280px] mx-auto px-4 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand & Nav */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <div
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
            title="Bindnest - Home"
          >
            {/* Simplified logo for the main logo */}
            <BindnestLogoSimplified className="h-9 w-auto object-contain transition-transform group-hover:scale-105 shrink-0" />
            {/* First image wordmark replacing the application name */}
            <BindnestWordmark className="h-8 md:h-9 w-auto transition-transform group-hover:opacity-95" />
          </div>

          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentView === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => onNavigate(item.key)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-primary-container text-on-primary shadow-xs'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-xs md:max-w-sm mx-2 hidden md:block">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-outline pointer-events-none text-[19px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search books, friends, notes... (Ctrl+K)"
              className="w-full pl-10 pr-4 py-2 h-10 bg-surface-container-lowest rounded-full text-xs text-on-surface placeholder:text-outline shadow-[0_1px_4px_rgba(43,36,32,0.04)] focus:outline-none focus:ring-2 focus:ring-primary/20 border border-surface-container-high transition-all"
            />
          </div>
        </div>

        {/* Action Controls & User Presence */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Streak pill */}
          <button
            onClick={() => onNavigate('stats-streaks')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/70 text-on-secondary-container text-xs font-semibold hover:bg-secondary-container transition-colors"
            title="View Habit & Streak Telemetry"
          >
            <span className="text-[14px]">🔥</span>
            <span>{streakDays} Days Streak</span>
          </button>

          {/* Ambient Soundboard */}
          <AmbientAudioPlayer initialTrack="rain" />

          {/* Social Share Card Studio Action */}
          <button
            onClick={onOpenShareModal}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors"
            title="Open Aesthetic Share Card Generator"
            aria-label="Share Card Generator"
          >
            <span className="material-symbols-outlined text-[20px]">ios_share</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setUnreadNotifications(0);
              }}
              aria-label="Notifications"
              className="relative w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              {unreadNotifications > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error ring-2 ring-surface" />
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 top-11 w-80 p-4 bg-surface-container-lowest rounded-2xl shadow-xl z-50 border border-surface-container-high flex flex-col gap-3">
                <div className="flex items-center justify-between pb-1 border-b border-surface-container-high">
                  <span className="font-semibold text-xs text-on-surface">Notifications</span>
                  <span className="text-[11px] text-primary cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-surface-container-low flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px]">group</span>
                    <div>
                      <p className="font-medium text-on-surface">Elena Ramos highlighted a quote in Chapter 5</p>
                      <span className="text-[10px] text-outline">15m ago</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container-low flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[18px]">local_fire_department</span>
                    <div>
                      <p className="font-medium text-on-surface">Daily reading goal logged! 12 days active.</p>
                      <span className="text-[10px] text-outline">2h ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <div
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-1.5 pl-1 cursor-pointer"
            >
              <div className="relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqVUBQ3RaABQQ2TgOepx_nqG6UL_BjypU9_ljsOZ4xK5CBVa3d5ugAu4mkI9MckyJqCLujg4UjFMRNmglhpZCOrqu1es0EvskaP1oTQW3MoGn7-ZT7nwdRM4RznSEHaODMrSwQOoTdRQvWnrBrACUZDO5rkYNHxuLk8gp1JDW_dp_S7LdMUFIrDqcizD9rsFajpacX8ayCUU40RXKUCTm3qnpt9ooLqTUTeqp4E2zjE6JLN07XZGcfMQ"
                  alt="Clara Oswald"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-surface-container-high"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface" />
              </div>
              <span className="material-symbols-outlined text-outline text-[18px]">expand_more</span>
            </div>

            {isProfileOpen && (
              <div className="absolute right-0 top-11 w-56 p-2 bg-surface-container-lowest rounded-2xl shadow-xl z-50 border border-surface-container-high flex flex-col gap-1 text-xs">
                <div className="px-3 py-2 border-b border-surface-container-high">
                  <p className="font-semibold text-on-surface">Clara Oswald</p>
                  <p className="text-[11px] text-outline">clara.reads · Top 5% Consistency</p>
                </div>
                <button
                  onClick={() => {
                    onNavigate('stats-streaks');
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container flex items-center gap-2 text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[17px] text-outline">insights</span>
                  <span>Habit & Telemetry</span>
                </button>
                <button
                  onClick={() => {
                    onOpenShareModal();
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container flex items-center gap-2 text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[17px] text-outline">photo_camera</span>
                  <span>Share Card Studio</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('reader');
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container flex items-center gap-2 text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[17px] text-outline">tune</span>
                  <span>Reader Preferences</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer Row */}
      <div className="xl:hidden flex items-center overflow-x-auto scrollbar-none px-4 py-2 bg-surface-container-low border-t border-surface-container-high gap-1">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              currentView === item.key
                ? 'bg-primary-container text-on-primary'
                : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
