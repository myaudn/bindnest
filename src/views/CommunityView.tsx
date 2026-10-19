import React, { useState } from 'react';
import { BookClub, LiveEvent, ViewType } from '../types.ts';
import { MOCK_BOOK_CLUBS, MOCK_EVENTS } from '../data/mockData.ts';

interface CommunityViewProps {
  onNavigate: (view: ViewType) => void;
  onOpenShareModal: (quote?: string, book?: string, author?: string) => void;
}

interface ForumPost {
  id: string;
  author: string;
  avatar: string;
  bookTitle: string;
  chapter: string;
  text: string;
  hasSpoiler: boolean;
  showSpoiler?: boolean;
  likes: number;
  comments: number;
  timestamp: string;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ onNavigate, onOpenShareModal }) => {
  const [activeTab, setActiveTab] = useState<'salons' | 'discussions' | 'events'>('salons');
  const [clubs, setClubs] = useState<BookClub[]>(MOCK_BOOK_CLUBS);
  const [events, setEvents] = useState<LiveEvent[]>(MOCK_EVENTS);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([
    {
      id: 'post_1',
      author: 'Clara Oswald',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
      bookTitle: 'Tomorrow, and Tomorrow, and Tomorrow',
      chapter: 'Act II: The Bothy',
      text: 'The metaphor of video games as the only medium where failure is not terminal, but an inherent requirement of progression, completely reframed how I perceive Sam and Sadie’s collaborative grief.',
      hasSpoiler: false,
      likes: 38,
      comments: 12,
      timestamp: '2 hours ago'
    },
    {
      id: 'post_2',
      author: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
      bookTitle: 'Piranesi',
      chapter: 'Entry 31, Seventh Hall',
      text: 'The revelation regarding the identity of the Other and the true origin of the House left me staring at the wall for thirty minutes. Notice how the journal numbers quietly began to shift.',
      hasSpoiler: true,
      showSpoiler: false,
      likes: 54,
      comments: 19,
      timestamp: '5 hours ago'
    },
    {
      id: 'post_3',
      author: 'Aria Chen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      bookTitle: 'Klara and the Sun',
      chapter: 'Part 3',
      text: 'Ishiguro writes innocence not as naivety, but as an acute, heartbreaking fidelity to purpose. The description of the sunset through the barn slats is pure poetry.',
      hasSpoiler: false,
      likes: 42,
      comments: 7,
      timestamp: 'Yesterday'
    }
  ]);

  const [newPostText, setNewPostText] = useState('');
  const [selectedBookForPost, setSelectedBookForPost] = useState('Tomorrow, and Tomorrow, and Tomorrow');
  const [isSpoilerChecked, setIsSpoilerChecked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleJoinClub = (clubId: string) => {
    setClubs(prev => prev.map(c => {
      if (c.id === clubId) {
        const nextJoined = !c.isJoined;
        showToast(nextJoined ? `Joined "${c.name}"!` : `Left "${c.name}"`);
        return {
          ...c,
          isJoined: nextJoined
        };
      }
      return c;
    }));
  };

  const handleRsvpEvent = (eventId: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        const nextRsvp = !(e.isRsvp || e.isRsvpd);
        showToast(nextRsvp ? `RSVP confirmed for ${e.title}!` : `RSVP cancelled for ${e.title}`);
        return {
          ...e,
          isRsvp: nextRsvp,
          isRsvpd: nextRsvp
        };
      }
      return e;
    }));
  };

  const handleToggleSpoiler = (postId: string) => {
    setForumPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, showSpoiler: !p.showSpoiler };
      }
      return p;
    }));
  };

  const handleLikePost = (postId: string) => {
    setForumPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    }));
  };

  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: ForumPost = {
      id: `post_${Date.now()}`,
      author: 'Maya Audina',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      bookTitle: selectedBookForPost,
      chapter: 'Reader Marginalia',
      text: newPostText.trim(),
      hasSpoiler: isSpoilerChecked,
      showSpoiler: false,
      likes: 1,
      comments: 0,
      timestamp: 'Just now'
    };

    setForumPosts([newPost, ...forumPosts]);
    setNewPostText('');
    setIsSpoilerChecked(false);
    showToast('Your marginalia has been published to the Literary Salon.');
  };

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
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#21160e] via-[#312117] to-[#170e08] text-[#fdfaf7] p-8 md:p-12 shadow-xl border border-[#443124]">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e37f48]/20 border border-[#e37f48]/30 text-[#e37f48] text-xs font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">local_cafe</span>
            Bindnest Parlor & Salons
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#faf3ea] tracking-tight">
            The Reading Parlor
          </h1>
          <p className="text-base md:text-lg font-serif italic text-[#d4c1b2] leading-relaxed">
            A quiet sanctuary for contemplative readers. Gentle asynchronous salons, synchronized silent sprints, and deep marginalia free from doomscrolling and commercial clamor.
          </p>

          {/* Quick tab switcher */}
          <div className="pt-4 flex flex-wrap gap-2">
            {[
              { id: 'salons', label: 'Active Book Clubs & Salons', icon: 'groups' },
              { id: 'discussions', label: 'Salon Marginalia & Reviews', icon: 'forum' },
              { id: 'events', label: 'Live Silent Sprints & Tea Times', icon: 'timer' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-sans font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#e37f48] text-[#1c120c] font-bold shadow-md'
                    : 'bg-[#ffffff]/10 text-[#d8c7b8] hover:bg-[#ffffff]/15 border border-white/10'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section 1: Active Book Clubs & Salons */}
      {activeTab === 'salons' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#2d221c] dark:text-[#f8eee5]">
                Curated Book Clubs & Quiet Salons
              </h2>
              <p className="text-sm font-serif italic text-[#7a685b] dark:text-[#bdaaa0]">
                Small, intimate reading circles with synchronized milestones
              </p>
            </div>
            <button
              onClick={() => showToast('Club creation portal opened')}
              className="px-4 py-2.5 rounded-xl bg-[#7e370d] text-white text-xs font-sans font-semibold hover:bg-[#682c09] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">add_circle</span>
              Start New Reading Salon
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clubs.map(club => (
              <div
                key={club.id}
                className="bg-[#fcf8f3] dark:bg-[#251e18] rounded-2xl border border-[#ece1d4] dark:border-[#3d3128] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#7e370d] dark:text-[#e37f48] bg-[#7e370d]/10 dark:bg-[#7e370d]/30 px-2.5 py-1 rounded-md font-semibold">
                      {club.genre}
                    </span>
                    <span className="text-xs text-[#857366] dark:text-[#a89689] flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">group</span>
                      {club.membersCount} readers
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#2d221c] dark:text-[#f8eee5]">
                      {club.name}
                    </h3>
                    <p className="text-xs font-serif italic text-[#6a5648] dark:text-[#bdaaa0] mt-1 line-clamp-2">
                      {club.description}
                    </p>
                  </div>

                  {/* Current Book Info */}
                  <div className="flex items-center gap-3 bg-white dark:bg-[#2d231d] p-3 rounded-xl border border-[#e8ded3] dark:border-[#3e322a]">
                    <img
                      src={club.coverUrl || club.currentBookCover || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400'}
                      alt={club.currentBook}
                      className="w-12 h-16 object-cover rounded-md shadow-xs shrink-0"
                    />
                    <div className="min-w-0 space-y-1">
                      <div className="text-[10px] uppercase font-bold text-[#7e370d] dark:text-[#e37f48]">Currently Reading</div>
                      <div className="font-serif font-bold text-xs text-[#2d221c] dark:text-[#f8eee5] truncate">
                        {club.currentBook}
                      </div>
                      <div className="text-[11px] text-[#857366] dark:text-[#bdaaa0]">
                        Pace: {club.pacing || 'Weekly chapters'}
                      </div>
                      <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                        Next Salon: {club.nextMeeting || club.nextSession || 'This week'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#f8f1ea] dark:bg-[#201914] border-t border-[#ede3d8] dark:border-[#382c23] flex items-center justify-between">
                  <span className="text-xs text-[#857366] font-sans">
                    {club.isJoined ? 'Active Member' : 'Open Cohort'}
                  </span>
                  <button
                    onClick={() => handleJoinClub(club.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold cursor-pointer transition-all ${
                      club.isJoined
                        ? 'bg-transparent text-[#7e370d] border border-[#7e370d] hover:bg-[#7e370d]/10'
                        : 'bg-[#7e370d] text-white hover:bg-[#682c09] shadow-xs'
                    }`}
                  >
                    {club.isJoined ? 'Joined ✓' : 'Join Salon'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 2: Discussions & Marginalia Feed */}
      {activeTab === 'discussions' && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Post composer & Feed */}
          <div className="lg:col-span-8 space-y-6">
            {/* New Thought Composer */}
            <form
              onSubmit={handlePublishPost}
              className="bg-[#fcf8f3] dark:bg-[#251e18] p-6 rounded-2xl border border-[#ece1d4] dark:border-[#3d3128] shadow-xs space-y-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                  alt="Maya"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#7e370d]"
                />
                <div className="flex-1">
                  <div className="text-xs font-bold text-[#2d221c] dark:text-[#f8eee5]">Maya Audina</div>
                  <div className="text-[11px] text-[#857366]">Writing marginalia into the collective parlor</div>
                </div>
                <select
                  value={selectedBookForPost}
                  onChange={e => setSelectedBookForPost(e.target.value)}
                  className="text-xs font-serif bg-white dark:bg-[#2d231d] border border-[#dcd0c3] dark:border-[#423429] rounded-lg px-2.5 py-1.5 text-[#2d221c] dark:text-[#f5ece4] focus:outline-hidden"
                >
                  <option value="Tomorrow, and Tomorrow, and Tomorrow">Tomorrow, and Tomorrow...</option>
                  <option value="Piranesi">Piranesi</option>
                  <option value="Klara and the Sun">Klara and the Sun</option>
                  <option value="Sea of Tranquility">Sea of Tranquility</option>
                  <option value="General Literary Musings">General Musings</option>
                </select>
              </div>

              <textarea
                value={newPostText}
                onChange={e => setNewPostText(e.target.value)}
                placeholder="Share an excerpt reflection, thematic paradox, or chapter impression..."
                rows={3}
                className="w-full text-sm font-serif bg-white dark:bg-[#1f1915] border border-[#e4d8cc] dark:border-[#3f3127] rounded-xl p-3 text-[#2d221c] dark:text-[#f5ece4] placeholder-[#a69688] focus:outline-hidden focus:ring-2 focus:ring-[#7e370d]/30 resize-none"
              />

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#7a685b] dark:text-[#bdaaa0]">
                  <input
                    type="checkbox"
                    checked={isSpoilerChecked}
                    onChange={e => setIsSpoilerChecked(e.target.checked)}
                    className="rounded text-[#7e370d] focus:ring-[#7e370d] cursor-pointer"
                  />
                  <span>Contains Plot Spoiler (Mask until tapped)</span>
                </label>

                <button
                  type="submit"
                  disabled={!newPostText.trim()}
                  className="px-5 py-2 rounded-xl bg-[#7e370d] disabled:opacity-50 text-white font-sans font-semibold text-xs hover:bg-[#682c09] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                  Post Reflection
                </button>
              </div>
            </form>

            {/* Posts List */}
            <div className="space-y-4">
              {forumPosts.map(post => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-[#251e18] p-6 rounded-2xl border border-[#ece1d4] dark:border-[#3d3128] shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-serif font-bold text-sm text-[#2d221c] dark:text-[#f8eee5]">
                          {post.author}
                        </div>
                        <div className="text-xs text-[#857366] font-sans">
                          on <span className="font-serif italic font-semibold text-[#7e370d] dark:text-[#e37f48]">{post.bookTitle}</span> • {post.chapter}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-[#9d8d80] font-sans">{post.timestamp}</span>
                  </div>

                  {/* Body Text (Spoiler handled) */}
                  {post.hasSpoiler && !post.showSpoiler ? (
                    <div
                      onClick={() => handleToggleSpoiler(post.id)}
                      className="p-4 rounded-xl bg-[#f5ede3] dark:bg-[#322720] border border-dashed border-[#d5c3b2] dark:border-[#4d3a2e] text-center cursor-pointer hover:bg-[#eedfcb] transition-all"
                    >
                      <span className="material-symbols-outlined text-amber-700 dark:text-amber-400 text-lg block mb-1">
                        visibility_off
                      </span>
                      <p className="text-xs font-sans font-bold text-[#6d5747] dark:text-[#d9c7b8]">
                        This marginalia contains a plot spoiler for {post.bookTitle}
                      </p>
                      <p className="text-[11px] text-[#8e7a6c] mt-0.5">Click to reveal paragraph</p>
                    </div>
                  ) : (
                    <p className="text-sm font-serif text-[#3d2e24] dark:text-[#e4d6ca] leading-relaxed">
                      "{post.text}"
                    </p>
                  )}

                  <div className="pt-2 flex items-center justify-between border-t border-[#f0e6dc] dark:border-[#382c23] text-xs text-[#857366] dark:text-[#bdaaa0]">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className="flex items-center gap-1.5 hover:text-[#7e370d] transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">favorite_border</span>
                        <span>{post.likes} Resonances</span>
                      </button>
                      <button
                        onClick={() => showToast('Opened thread commentary')}
                        className="flex items-center gap-1.5 hover:text-[#7e370d] transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">chat_bubble_outline</span>
                        <span>{post.comments} Responses</span>
                      </button>
                    </div>

                    <button
                      onClick={() => onOpenShareModal(post.text, post.bookTitle, post.author)}
                      className="flex items-center gap-1.5 hover:text-[#7e370d] transition-colors cursor-pointer font-serif italic"
                    >
                      <span className="material-symbols-outlined text-sm">share</span>
                      <span>Cardify Excerpt</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Rail: Prompts & Community Highlights */}
          <div className="lg:col-span-4 space-y-6">
            {/* Salon Prompt of the Week */}
            <div className="bg-gradient-to-br from-[#7e370d] to-[#592305] text-white p-6 rounded-2xl shadow-md space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-[#ffdbcb]">
                <span className="material-symbols-outlined text-sm">lightbulb</span>
                Salon Question of the Week
              </div>
              <h3 className="font-serif font-bold text-lg leading-snug">
                "Which fictional library, archive, or labyrinth would you willingly reside in for eternity?"
              </h3>
              <p className="text-xs font-serif italic text-[#f7d7c6] leading-relaxed">
                From the infinite tidal Halls of Piranesi to Borges' Library of Babel or the Citadel in Westeros.
              </p>
              <button
                onClick={() => {
                  setNewPostText('If I had to choose an eternal library, it would be Piranesi’s House: ');
                  showToast('Prompt loaded into composer above');
                }}
                className="mt-2 w-full py-2 rounded-xl bg-white text-[#7e370d] font-bold text-xs uppercase tracking-wider hover:bg-[#fff5ee] transition-all cursor-pointer shadow-sm"
              >
                Respond in Parlor
              </button>
            </div>

            {/* Weekly Top Curators */}
            <div className="bg-[#fcf8f3] dark:bg-[#251e18] p-6 rounded-2xl border border-[#ece1d4] dark:border-[#3d3128] space-y-4">
              <h3 className="font-serif font-bold text-base text-[#2d221c] dark:text-[#f8eee5] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7e370d]">verified</span>
                Esteemed Curators This Month
              </h3>

              <div className="space-y-3">
                {[
                  { name: 'Elena Rostova', books: '18 books read', streak: '58 days', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
                  { name: 'Julian Thorne', books: '14 books read', streak: '42 days', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
                  { name: 'Maya Lin', books: '12 books read', streak: '14 days', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150' },
                ].map(c => (
                  <div key={c.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="text-xs font-bold text-[#2d221c] dark:text-[#f8eee5]">{c.name}</div>
                        <div className="text-[10px] text-[#857366]">{c.books}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-[#f0e7dd] dark:bg-[#342921] text-[#7e370d] dark:text-[#e37f48] px-2 py-0.5 rounded-full font-bold">
                      🔥 {c.streak}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section 3: Live Silent Sprints & Tea Times */}
      {activeTab === 'events' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#2d221c] dark:text-[#f8eee5]">
                Scheduled Silent Sprints & Tea Sessions
              </h2>
              <p className="text-sm font-serif italic text-[#7a685b] dark:text-[#bdaaa0]">
                Dedicated Pomodoro focus blocks where bibliophiles gather in camera-off, audio-ambient silence
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map(event => (
              <div
                key={event.id}
                className="bg-[#fcf8f3] dark:bg-[#251e18] p-6 rounded-2xl border border-[#ece1d4] dark:border-[#3d3128] shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#7e370d] bg-[#7e370d]/10 px-2.5 py-1 rounded-md font-bold">
                      {event.scheduledFor || event.time || 'Scheduled'}
                    </span>
                    <span className="text-xs text-[#857366] flex items-center gap-1 font-mono">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {event.durationMinutes || 45} minutes
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#2d221c] dark:text-[#f8eee5]">
                      {event.title}
                    </h3>
                    <p className="text-xs font-serif italic text-[#6a5648] dark:text-[#bdaaa0] mt-1">
                      {event.description}
                    </p>
                  </div>

                  <div className="text-xs text-[#857366] flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">person</span>
                    <span>Hosted by <strong className="text-[#2d221c] dark:text-[#f8eee5]">{event.host}</strong></span>
                    <span>•</span>
                    <span>{event.attendeesCount || event.attendees || 42} Readers Attending</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#ede3d8] dark:border-[#382c23] flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">headset</span>
                    Synchronized Rain Lo-Fi
                  </span>

                  <button
                    onClick={() => handleRsvpEvent(event.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold cursor-pointer transition-all ${
                      event.isRsvp
                        ? 'bg-emerald-800 text-white'
                        : 'bg-[#7e370d] text-white hover:bg-[#682c09]'
                    }`}
                  >
                    {event.isRsvp ? 'Attending ✓' : 'RSVP for Sprint'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
