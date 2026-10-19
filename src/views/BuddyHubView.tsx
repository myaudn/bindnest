import React, { useState, useEffect } from 'react';
import { ViewType, FriendSession } from '../types.ts';

interface BuddyHubViewProps {
  onNavigate: (view: ViewType) => void;
  friends: FriendSession[];
}

export const BuddyHubView: React.FC<BuddyHubViewProps> = ({ onNavigate, friends }) => {
  // Pomodoro state
  const [pomodoroActive, setPomodoroActive] = useState<boolean>(false);
  const [pomodoroSeconds, setPomodoroSeconds] = useState<number>(25 * 60);

  // Discussion state
  const [spoilerRevealed, setSpoilerRevealed] = useState<boolean>(false);
  const [chapter4Replies, setChapter4Replies] = useState<string[]>([
    'Underlined this twice. Beautiful framing of creative co-dependency.'
  ]);
  const [commentInput, setCommentInput] = useState<string>('');

  // Invite state
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [invitedFriends, setInvitedFriends] = useState<Record<string, boolean>>({});

  // Incoming requests
  const [requests, setRequests] = useState([
    {
      id: 'req1',
      name: 'Chloe Bennett',
      handle: '@chloe_reads',
      note: 'Wants to join ‘Klara’ room',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4AoCjlE2zyxVKuxlAOQUmw8l91-7lSIQN83mty0WLhc6lBmDH7OnBbvoKpkmzJqZmPYMSBxfjuI084lPNElTtE74ymwfSiye8HiIeGcSwqBH8lm0lX1h0tTYtaq5nl4mGUohpvqiJu1H1lXd2l2tIhanCKzfITPLFB32qmNmlzMQ95lu7ATdckwfCIjhdkTgsdtKsHHlcOw5O3k4jxLZJh1NM23MA8S5u675AUIYQFVsvGcwj_XE8Pg',
    },
    {
      id: 'req2',
      name: 'David Kim',
      handle: '@dk_lit',
      note: 'Read 18 books this year',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHeQtafzJsxmGHs7qow0Y2G9gbgNSLSWwvNkaXzcIUy-hATN_x7EcFaP0mdI7AzqvgJsRXV0D7GpXKt1-rjfO-cIfz5mM3cEVbjUpwYaLMJ2VhU3WzQNup8agi8kyTdv51fnW7iu4JdfiG7wccVseq_QZ_aYVkZNkt5rfb_pEZuYDvI12ScsGKTyv3IJVX05zBueFRJmzXFannIZLYKBbqzXb13GW2MTbWMrJWhRU7JTP-k4upz-3acg',
    },
  ]);

  const [activeFilter, setActiveFilter] = useState<'all' | 'reading' | 'offline'>('all');
  const [rsvpState, setRsvpState] = useState<boolean>(false);

  // Pomodoro timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (pomodoroActive && pomodoroSeconds > 0) {
      interval = setInterval(() => {
        setPomodoroSeconds((sec) => sec - 1);
      }, 1000);
    } else if (pomodoroSeconds === 0) {
      setPomodoroActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pomodoroActive, pomodoroSeconds]);

  const formatPomoTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://litsphere.com/buddy/room-9284-read');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setChapter4Replies([...chapter4Replies, commentInput.trim()]);
    setCommentInput('');
  };

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1280px] w-full mx-auto px-4 lg:px-12 py-6 flex flex-col gap-8">
        {/* Breadcrumb & Atmospheric Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-outline">
              <span className="hover:text-primary transition-colors cursor-pointer">Bindnest Community</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary font-semibold">Social Circle & Buddy Reads</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-on-surface tracking-tight mt-1 font-normal">
              Friends & Buddy Reading Sanctuary
            </h1>
            <p className="text-sm text-on-surface-variant">
              Find fellow bookworms, join synchronized silent reading rooms, and enjoy rich chapter discussions without plot spoilers.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => {
                const el = document.getElementById('invite-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container text-primary text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[17px]">person_add</span>
              <span>Invite Friend</span>
            </button>
            <button
              onClick={() => onNavigate('reader')}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[17px]">auto_stories</span>
              <span>Start Buddy Read</span>
            </button>
          </div>
        </div>

        {/* Top Quick Stats Strip (4 metrics) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-surface-container-high/60 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-secondary-container/50 flex items-center justify-center text-secondary flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">group</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif font-bold text-xl text-on-surface">14</span>
              <span className="text-xs text-on-surface-variant truncate">Reading Friends</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-surface-container-high/60 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed/40 flex items-center justify-center text-primary flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">forum</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif font-bold text-xl text-on-surface">3</span>
              <span className="text-xs text-on-surface-variant truncate">Active Group Lobbies</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-surface-container-high/60 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-tertiary-fixed/40 flex items-center justify-center text-tertiary flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">mark_email_unread</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif font-bold text-xl text-on-surface">{requests.length}</span>
              <span className="text-xs text-on-surface-variant truncate">Incoming Requests</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-surface-container-high/60 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">hourglass_top</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif font-bold text-xl text-on-surface">45.2h</span>
              <span className="text-xs text-on-surface-variant truncate">Read Together</span>
            </div>
          </div>
        </div>

        {/* Main Two-Column Reading Sanctuary Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Buddy Lobby & Discussions (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Active Buddy Reading Lobby Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container-high/60 flex flex-col gap-5 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none" />

              {/* Lobby Banner Head */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/60 text-on-secondary-container text-xs font-semibold w-fit">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span>
                    Live Silent Reading Room #04 • {pomodoroActive ? `${formatPomoTime(pomodoroSeconds)} active` : '25 min Pomodoro'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-outline text-xs">
                  <span className="material-symbols-outlined text-[16px] text-secondary">wifi_tethering</span>
                  <span>Synchronized Pacing Mode</span>
                </div>
              </div>

              {/* Featured Current Book Metadata */}
              <div className="flex flex-col sm:flex-row items-start gap-4 z-10">
                <div className="w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden shadow-md bg-surface-container">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeccLvpK97CgMkPE0QMEScC1Jd6znzZrVgfTm19R7RIiC9I15YWORUNTFEOE9nQYDHGODsiAQcFJgTJtooHZj7ftYMNvj-A4-JNTYPaozTrOXzjL2HAAgybN3WcRRLk7MR9iWKHdT-_0RjQKk5QGVYVYgJXYHAKSSL2Q_K6R9RFU50bBH2axtJ7resFgWhbDGL-m66O9yzaT2KSUpLXhAv-ewoZ7QRNj5FtmE1i32y6O_qfk9WJxfSfQ"
                    alt="Tomorrow, and Tomorrow, and Tomorrow"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1 min-w-0 justify-center">
                  <span className="text-xs uppercase tracking-wider text-primary font-bold">Active Cohort Read</span>
                  <h2 className="font-serif text-xl md:text-2xl text-on-surface">
                    Tomorrow, and Tomorrow, and Tomorrow
                  </h2>
                  <p className="text-xs text-on-surface-variant">by Gabrielle Zevin • 416 pages total</p>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-outline">
                    <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-medium">
                      4 Readers active
                    </span>
                    <span>•</span>
                    <span className="text-secondary font-semibold">Room Alignment: 94%</span>
                    <span>•</span>
                    <span className="text-tertiary">Target Today: Finish Part IV (p. 225)</span>
                  </div>
                </div>
              </div>

              {/* Synchronized Visual Progress Rail */}
              <div className="flex flex-col gap-2 pt-2 z-10">
                <div className="flex justify-between items-center text-xs text-outline">
                  <span>Start (p. 0)</span>
                  <span className="text-on-surface-variant font-semibold">Cohort Spread: Pages 165 - 210</span>
                  <span>Finish (p. 416)</span>
                </div>

                {/* Base Visual Track */}
                <div className="relative w-full h-10 flex items-center my-1">
                  <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-secondary/50 via-primary-container/70 to-primary"
                      style={{ width: '50.4%' }}
                    />
                  </div>

                  {/* Julian (p. 165 = 39.6%) */}
                  <div
                    className="absolute group cursor-pointer"
                    style={{ left: 'calc(39.6% - 14px)' }}
                    title="Julian Wu - Page 165"
                  >
                    <div className="w-7 h-7 rounded-full ring-2 ring-surface shadow-xs overflow-hidden bg-surface-container">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfVRfvryEsVmjAlAmObWMEkbyxOtC5kP9vztEu2xH7pd5CmFdSGS2r1ITNd1ojJfpWJqIJ8ar_C1KR1NOmzab1XbTo1A9t27YVPe1Qm6DlBjx10nQ7nO2XfC7tl8x2CfumTDaF4-QsujcpF2v_F2qvRQKzl3gwKqOsDBdtqdqIo6fFp2p0dBvTBnISltt0cuT-r8avlgwrphTWxEVZ3RrmSs69vtqgzsrIp0XU87C5Zhz1YNyt5w7_uA"
                        alt="Julian"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Marcus (p. 180 = 43.2%) */}
                  <div
                    className="absolute group cursor-pointer"
                    style={{ left: 'calc(43.2% - 14px)' }}
                    title="Marcus Vance - Page 180"
                  >
                    <div className="w-7 h-7 rounded-full ring-2 ring-surface shadow-xs overflow-hidden bg-surface-container">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdCIxvM9QfallLkwnoBzIqyZi6k7cDUDPrTN7hoaNghUDH3Os2WlWYW_VmVmV4isGcqN_WyECEwCSO2cRHIFDJz20NUuODA0mDlMhfuOYxThUkWiPm7sMTeNRKQDqs0H_TFEZ1DC-Mtt9rsUbpQdZbfJpR_V0Yc4zvS0mbL4aj3AxKmOlPeqkldJkG3LD54pD8X5t8Xr0WoOSHaYczOzqDabFY_6Uh17-mYgdzi3BgANbZr2yaau-M_A"
                        alt="Marcus"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* You (p. 195 = 46.8%) with Terracotta Beacon */}
                  <div
                    className="absolute group cursor-pointer z-20 flex flex-col items-center"
                    style={{ left: 'calc(46.8% - 18px)' }}
                    title="You - Page 195"
                  >
                    <div className="bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap mb-1">
                      You: p.195
                    </div>
                    <div className="w-8 h-8 rounded-full ring-4 ring-primary/20 shadow-sm overflow-hidden bg-surface-container">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqVUBQ3RaABQQ2TgOepx_nqG6UL_BjypU9_ljsOZ4xK5CBVa3d5ugAu4mkI9MckyJqCLujg4UjFMRNmglhpZCOrqu1es0EvskaP1oTQW3MoGn7-ZT7nwdRM4RznSEHaODMrSwQOoTdRQvWnrBrACUZDO5rkYNHxuLk8gp1JDW_dp_S7LdMUFIrDqcizD9rsFajpacX8ayCUU40RXKUCTm3qnpt9ooLqTUTeqp4E2zjE6JLN07XZGcfMQ"
                        alt="You"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Elena Ramos (Host p. 210 = 50.4%) */}
                  <div
                    className="absolute group cursor-pointer z-10"
                    style={{ left: 'calc(50.4% - 15px)' }}
                    title="Elena Ramos (Host) - Page 210"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full ring-2 ring-secondary shadow-xs overflow-hidden bg-surface-container">
                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWRYGwBc4pnTamE28T-KFLwxi_WwnDVcQBsaiErZ5ocGXmYPLGzqN8apPscErYarbsEdiq2gyMf4O-uaB27PX8_pc2gf1UUEwEVt0EBZ1kA3tqqtA83Mfo_tPsMHM6EEZm9LONMZbXkWwDXQvZNL9id2333KzESi2HNYEkvdjhQA_JEfycAfvYRuG-jpbuoIAkkujhbbyiXxPZ83C_hbgQfgfRQ2JfvV0WauRaqeY-6eCJn4Fuxm0SYw"
                          alt="Elena"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Alignment Summary Pill */}
                <div className="p-3 rounded-xl bg-surface-container flex flex-wrap items-center justify-between gap-2 text-xs text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                    <span>
                      You are <strong>15 pages behind Elena</strong> and <strong>15 pages ahead of Marcus</strong>.
                    </span>
                  </div>
                  <button onClick={() => onNavigate('reader')} className="text-primary font-semibold hover:underline">
                    Update my page →
                  </button>
                </div>
              </div>

              {/* Room Controls & Pomodoro Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 z-10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (!pomodoroActive) {
                        setPomodoroSeconds(25 * 60);
                      }
                      setPomodoroActive(!pomodoroActive);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs ${
                      pomodoroActive
                        ? 'bg-secondary text-on-secondary hover:bg-secondary/90'
                        : 'bg-primary text-on-primary hover:bg-primary-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      {pomodoroActive ? 'pause_circle' : 'play_circle'}
                    </span>
                    <span>
                      {pomodoroActive
                        ? `Pomodoro Active (${formatPomoTime(pomodoroSeconds)})`
                        : 'Join Silent Pomodoro (25:00)'}
                    </span>
                  </button>
                  <button
                    onClick={() => setPomodoroSeconds(25 * 60)}
                    className="px-3 py-2 rounded-xl bg-surface-container text-on-surface-variant hover:text-on-surface text-xs font-semibold"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Spoiler-Guarded Discussion Thread Section */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-xl text-on-surface">Spoiler-Guarded Discussion Thread</h3>
                  <p className="text-xs text-on-surface-variant">
                    Protected sync based on your current reading progress.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold">
                  <span className="material-symbols-outlined text-[15px] text-primary">security</span>
                  <span>Auto-locks past Page 195</span>
                </div>
              </div>

              {/* Accordion Threads */}
              <div className="space-y-3">
                {/* Chapter 4 (Unlocked) */}
                <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-high/60 overflow-hidden">
                  <div className="p-4 flex items-center justify-between bg-surface-container-low/50">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-secondary-container text-secondary flex items-center justify-center font-bold text-xs">
                        <span className="material-symbols-outlined text-[16px]">lock_open</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-on-surface">Chapter 4: The Unrealized World</h4>
                        <span className="text-xs text-outline">Pages 140 – 185 • 6 shared notes • Fully Unlocked</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col gap-4">
                    {/* Comment 1: Marcus */}
                    <div className="flex items-start gap-3">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw6tL9ik5NpilYK5GOQ9juir1bLoDMpZfwujsd9qEsnHDf6CmwF3deC-qdlTRSWVPJi_YIaHd8O0RUHsiavQuGhqc2_FwNIDPAdRqp9H0Hlshyi-Dx-V09CPV-ZiJhvzcPQcNdqZLggImt1Gn201Ylu9cGgCh165OOPxUhcWMB-hc4ONFsUHjnSwcVJ20bjxDY8HBlwkQ_y46KEsMkgLX4iJSI-JZWZyda8YOgNojUtI44tufZ8SWf8Q"
                        alt="Marcus"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1 bg-surface-container-low p-3.5 rounded-xl text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-on-surface">Marcus Vance</span>
                            <span className="px-1.5 py-0.2 rounded bg-surface-container text-outline text-[10px]">
                              p. 154
                            </span>
                          </div>
                          <span className="text-outline text-[11px]">2 hrs ago</span>
                        </div>
                        <p className="text-on-surface-variant leading-relaxed">
                          The way Sam and Sadie argue about game engines reveals everything about their relationship dynamics. It’s never truly about code; it’s about autonomy and unspoken creative fear.
                        </p>
                      </div>
                    </div>

                    {/* Comment 2: Elena */}
                    <div className="flex items-start gap-3">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGuCSxE_nGTNbkWkvepCN1vnYYDX3p1Owe3DAjG11fFRtJbczvMDvJBn5CJIdKIErF8Snfx-g1HSUbEbs4xt_piZ4-nBHnXHKdT0rv924ZJMPeLwFKexREdp1RuqNz9S7XcVxRR7MtDQkKGBW_XfqvFzKbiLZz4Y5kEORTqeCXqBf1GzwJ_cyh6JzVuolEpLsj6Ke81Wub4rnvKzCWXkkVuBHIhkUncjyZVg6Q-06g-9B2io3t3_Fwbg"
                        alt="Elena"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1 bg-surface-container-low p-3.5 rounded-xl text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-on-surface">Elena Ramos</span>
                            <span className="px-1.5 py-0.2 rounded bg-secondary-container/50 text-secondary text-[10px]">
                              Host • p. 172
                            </span>
                          </div>
                          <span className="text-outline text-[11px]">35 min ago</span>
                        </div>

                        <div className="pl-3 border-l-2 border-tertiary bg-tertiary-fixed/15 p-2 rounded-r-lg font-serif italic text-on-surface">
                          “To allow yourself to play with another person is no small risk. Does it mean you are giving up part of yourself, or creating someone new?”
                        </div>

                        {chapter4Replies.map((r, i) => (
                          <p key={i} className="text-on-surface-variant leading-relaxed">
                            {r}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Quick Reply Form */}
                    <form onSubmit={handlePostComment} className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Add a thoughtful note or quote for Chapter 4..."
                        className="flex-1 px-3 py-2 rounded-xl bg-surface-container-low text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 border border-surface-container-high"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold rounded-xl transition-colors"
                      >
                        Post
                      </button>
                    </form>
                  </div>
                </div>

                {/* Chapter 5 (Spoiler Guarded) */}
                <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-high/60 overflow-hidden relative">
                  <div className="p-4 flex items-center justify-between bg-surface-container-low/30">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-error-container text-error flex items-center justify-center font-bold text-xs">
                        <span className="material-symbols-outlined text-[16px]">lock</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-on-surface">Chapter 5: Pioneers of the Pixel</h4>
                        <span className="text-xs text-outline">Pages 186 – 220 • 8 hidden comments</span>
                      </div>
                    </div>
                  </div>

                  {!spoilerRevealed ? (
                    <div className="p-6 relative flex flex-col items-center justify-center text-center">
                      <div className="w-full flex flex-col gap-2.5 blur-md select-none pointer-events-none opacity-30">
                        <div className="h-4 bg-on-surface-variant/20 rounded w-3/4 mx-auto" />
                        <div className="h-4 bg-on-surface-variant/20 rounded w-full" />
                        <div className="h-4 bg-on-surface-variant/20 rounded w-5/6 mx-auto" />
                      </div>

                      <div className="absolute inset-0 m-auto flex flex-col items-center justify-center p-4 gap-2 max-w-md">
                        <div className="w-10 h-10 rounded-full bg-error-container text-error flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                        </div>
                        <span className="font-serif font-bold text-base text-on-surface">
                          Chapter 5 Spoilers Guarded
                        </span>
                        <p className="text-xs text-on-surface-variant">
                          You are at <strong>Page 195</strong>. This thread contains discussions up to <strong>Page 220</strong>.
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => setSpoilerRevealed(true)}
                            className="px-4 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors"
                          >
                            Tap to Reveal Anyway
                          </button>
                          <span className="text-outline text-xs">or read 25 more pages</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 text-xs space-y-3 animate-in fade-in duration-300">
                      <div className="p-3 rounded-xl bg-surface-container-low text-on-surface-variant leading-relaxed">
                        <span className="font-semibold text-primary block mb-1">Revealed Chapter 5 Note (Elena Ramos):</span>
                        "The tragedy in Boston shifts Sam and Sadie's trajectory forever. Notice how the code architecture mirrors their inability to reconcile their unspoken feelings."
                      </div>
                      <button
                        onClick={() => setSpoilerRevealed(false)}
                        className="text-primary hover:underline text-xs"
                      >
                        Hide Spoilers Again
                      </button>
                    </div>
                  )}
                </div>

                {/* Chapter 6 (Locked) */}
                <div className="bg-surface-container-lowest rounded-2xl shadow-xs p-4 flex items-center justify-between opacity-75 border border-surface-container-high/60">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-surface-container-high text-outline flex items-center justify-center font-bold text-xs">
                      <span className="material-symbols-outlined text-[16px]">lock_clock</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-on-surface">Chapter 6: Tokyo Winter</h4>
                      <span className="text-xs text-outline">Pages 221 – 260 • Locked • Requires 65 more pages</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container text-outline text-xs font-medium">
                    Locked
                  </span>
                </div>
              </div>
            </div>

            {/* Invite Section Card */}
            <div
              id="invite-section"
              className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container-high/60 flex flex-col gap-5 transition-all"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs uppercase tracking-wider text-primary font-bold">
                    Grow Your Reading Circle
                  </span>
                  <h3 className="font-serif text-xl text-on-surface">Invite Companions to Room #04</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-secondary-container/70 text-on-secondary-container text-xs font-semibold">
                  Instant Seat Open
                </span>
              </div>

              {/* Lobby Invitation Link */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-on-surface-variant font-medium">Lobby Invitation Link</label>
                <div className="flex items-center gap-2 bg-surface-container-low rounded-xl p-1.5 border border-surface-container-high">
                  <span className="material-symbols-outlined text-outline pl-2 text-[19px]">link</span>
                  <input
                    type="text"
                    readOnly
                    value="https://litsphere.com/buddy/room-9284-read"
                    className="bg-transparent flex-1 text-xs text-on-surface focus:outline-none px-2 select-all"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-1.5 bg-primary text-on-primary hover:bg-primary-container rounded-lg text-xs font-semibold transition-colors shadow-xs"
                  >
                    {isCopied ? 'Copied! ✓' : 'Copy Link'}
                  </button>
                </div>
              </div>

              {/* Frequent Reading Mutuals */}
              <div className="flex flex-col gap-2">
                <span className="text-xs text-on-surface-variant font-medium">Frequent Reading Mutuals</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'sarah', name: 'Sarah Lin', status: 'Active now', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFnGPC2CQ-inSD2GCE5V3zytCelg8XBrlFNw81PlNZMkyiYCwjNgNRSMmVgewPPA1Ls2nXnB2YkGT5uC1tp1eFUDLtxaywDxVRUc2CWvb1AjGTnguIIL3xYgGq920bvp9OnFPTCDtRjYWVWgyBFTVc-sPHXoPbr2W6nf7iiSDrxiMxswzUw8EhAvjy2CDQQEsHEf8V7qXsPrR4p_eQDvNL0p_Ul2e4fuA1P2KZsAScAYq4jIEjhhLzLw' },
                    { id: 'liam-t', name: 'Liam Thorne', status: 'In your room', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0SfTBVIDjMQx_J57Jg9fnflKm2g6aTvFm3s9KKPr-NC5CU_9P4CuLGQyD8aJam6OZuVN7Zjun4a3jYmh4o_Bzm7l1UGsGdBg63bobPRzBzOtcfFF_pgJTgHaikWiPuy6iP90IXY_uv3jEIu7aPi0DAn7j4HaAlvVOI1huHlkcZZ5NHSTtNHbbvI5u1kmDHvBjHP7KO_Jm8ik5gsN0NVUNPxuNZKk28hXo-cpIWWBTG0jP3HplErODdg', joined: true },
                    { id: 'maya', name: 'Maya Chen', status: 'Free tonight', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-A5Q3edHklfdpXR_NmlYtphCgn7hr_mAH8KmALoAD48Y8CbUqKTyV_rvd-36im7Xb-hCGTbcIVcqPnV_od0UPwQOte9OUmQTJbkDlGFjY2xe9EuI02RstiMzC6kSBPrqm0_-QH4XJham67ecpFjsugBl7Uhy68ToUlX6QjO343tc3nxsJvT8yQO9a9ozClbLU7DQdJ1ko-3w__w3MabNLyk3wUwkrKNCFRRLo5ltyfd0MNZvHGKYdpw' },
                  ].map((mutual) => (
                    <div
                      key={mutual.id}
                      className="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between gap-2 border border-surface-container-high"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img src={mutual.img} alt={mutual.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-xs text-on-surface truncate">{mutual.name}</span>
                          <span className="text-[10px] text-outline truncate">{mutual.status}</span>
                        </div>
                      </div>
                      {mutual.joined ? (
                        <span className="text-[11px] text-secondary font-semibold px-2">Joined</span>
                      ) : (
                        <button
                          onClick={() =>
                            setInvitedFriends({ ...invitedFriends, [mutual.id]: !invitedFriends[mutual.id] })
                          }
                          className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary text-xs font-semibold shadow-xs transition-colors shrink-0"
                        >
                          {invitedFriends[mutual.id] ? 'Sent ✓' : '+ Invite'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Passcode footer */}
              <div className="flex items-center justify-between pt-2 border-t border-surface-container-high text-xs text-outline">
                <span>Passcode: <code className="font-mono text-on-surface font-semibold">READ-409</code></span>
                <span className="text-secondary font-semibold">4 Seats Available</span>
              </div>
            </div>
          </div>

          {/* Right Column: Discovery, Requests & Live Presence (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Incoming Requests */}
            {requests.length > 0 && (
              <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border-l-4 border-l-primary border border-surface-container-high/60 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-sm text-on-surface">Incoming Requests</h3>
                    <span className="px-2 py-0.2 rounded-full bg-primary-fixed text-primary font-bold text-[10px]">
                      {requests.length}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-outline text-[18px]">mail</span>
                </div>

                <div className="space-y-3">
                  {requests.map((req) => (
                    <div key={req.id} className="p-3 rounded-xl bg-surface-container-low text-xs space-y-2">
                      <div className="flex items-center gap-2.5">
                        <img src={req.avatar} alt={req.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-on-surface truncate">{req.name}</span>
                          <span className="text-[11px] text-outline truncate">{req.note}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setRequests(requests.filter((r) => r.id !== req.id))}
                          className="flex-1 py-1 rounded-lg bg-primary text-on-primary font-semibold text-xs shadow-xs"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => setRequests(requests.filter((r) => r.id !== req.id))}
                          className="px-3 py-1 rounded-lg bg-surface-container text-on-surface-variant font-semibold text-xs"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Friend Activity Live Roster */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-container-high/60 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-sm text-on-surface">Friend Activity</h3>
                <span className="flex items-center gap-1 text-xs text-secondary font-semibold">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span>5 Active</span>
                </span>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 pb-1">
                {(['all', 'reading', 'offline'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors ${
                      activeFilter === tab
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    {tab === 'all' ? 'All (14)' : tab === 'reading' ? 'Reading (5)' : 'Offline (9)'}
                  </button>
                ))}
              </div>

              {/* Roster list */}
              <div className="space-y-2 pt-1 text-xs">
                {friends.map((f) => (
                  <div
                    key={f.id}
                    className="p-2.5 rounded-xl hover:bg-surface-container-low transition-colors flex items-center justify-between gap-2 border border-surface-container-high/60"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative shrink-0">
                        <img src={f.avatarUrl} alt={f.name} className="w-8 h-8 rounded-full object-cover" />
                        <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-secondary ring-2 ring-surface" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-on-surface truncate">{f.name}</span>
                          <span className="text-[10px] bg-secondary-container/50 text-secondary px-1.5 rounded">
                            {f.mode}
                          </span>
                        </div>
                        <span className="text-[11px] text-outline truncate">{f.sessionNote}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate('reader')}
                      className="px-2 py-1 rounded-lg bg-secondary-container/60 hover:bg-secondary-container text-on-secondary-container text-xs font-semibold shrink-0"
                    >
                      Read Along
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Sunday Circle Event RSVP */}
            <div className="bg-primary-container text-on-primary p-5 rounded-2xl shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded-full bg-white/20 font-semibold">Sunday Circle Event</span>
                <span className="opacity-80">Oct 27 • 7:00 PM EST</span>
              </div>
              <div>
                <h4 className="font-serif font-bold text-base">Live Discussion: Chapters 10–15</h4>
                <p className="text-xs opacity-90 mt-0.5">
                  Host: Dr. Miriam Vance • Topic: "The boundaries of artificial perception & filial devotion."
                </p>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/20">
                <span className="text-xs opacity-80">42 readers RSVP'd</span>
                <button
                  onClick={() => setRsvpState(!rsvpState)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors ${
                    rsvpState ? 'bg-secondary text-on-secondary' : 'bg-surface-container-lowest text-primary'
                  }`}
                >
                  {rsvpState ? 'Registered ✓' : 'RSVP Free'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
