import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useReadingHistory } from '../context/ReadingHistoryContext';
import { RECOMMENDED_BOOKS, CONTINUE_READING_BOOKS } from '../utils/placeholderData';
import type { Book } from '../types';

type Tab = 'in_progress' | 'completed' | 'analytics';

// All books combined for lookup
const ALL_BOOKS: Book[] = [...RECOMMENDED_BOOKS, ...CONTINUE_READING_BOOKS];

const getBook = (id: string): Book | undefined => ALL_BOOKS.find(b => b.id === id);

// ── Dummy weekly reading data for bar chart ──
const WEEKLY_DATA = [
  { day: 'Mon', minutes: 45 },
  { day: 'Tue', minutes: 120 },
  { day: 'Wed', minutes: 30 },
  { day: 'Thu', minutes: 90 },
  { day: 'Fri', minutes: 75 },
  { day: 'Sat', minutes: 180 },
  { day: 'Sun', minutes: 60 },
];

const MONTHLY_DATA = [
  { month: 'Feb', books: 2 },
  { month: 'Mar', books: 3 },
  { month: 'Apr', books: 1 },
  { month: 'May', books: 4 },
  { month: 'Jun', books: 3 },
  { month: 'Jul', books: 2 },
];

const CATEGORY_DATA = [
  { label: 'Artificial Intelligence', value: 35, color: '#5300b7' },
  { label: 'Science',                 value: 25, color: '#2170e4' },
  { label: 'Business',               value: 20, color: '#0b34a4' },
  { label: 'Philosophy',             value: 12, color: '#6d28d9' },
  { label: 'Other',                  value: 8,  color: '#ccc3d7' },
];

// ── Sub-components ────────────────────────────────────────────

const ProgressCard: React.FC<{ bookId: string; progress: number; lastReadAt: string }> = ({ bookId, progress, lastReadAt }) => {
  const navigate = useNavigate();
  const { updateProgress } = useReadingHistory();
  const book = getBook(bookId);
  if (!book) return null;

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const hours = Math.floor(diff / 3_600_000);
    if (hours < 1) return 'just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="glass-card rounded-2xl p-5 flex gap-5 items-start book-card-hover transition-all duration-300 cursor-pointer group"
      onClick={() => navigate(`/book/${bookId}`)}>
      <div className="relative shrink-0">
        <img
          src={book.cover}
          alt={book.title}
          className="w-20 h-28 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
        />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 accent-gradient rounded-full flex items-center justify-center text-white shadow-md">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1", fontSize: '16px' }}>
            play_arrow
          </span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-headline-md text-body-lg font-bold mb-0.5 line-clamp-1">{book.title}</h3>
        <p className="text-label-md text-on-surface-variant mb-3">{book.author}</p>
        <div className="mb-2">
          <div className="flex justify-between text-label-sm mb-1">
            <span className="text-on-surface-variant">Progress</span>
            <span className="font-bold text-primary">{progress}%</span>
          </div>
          <div className="w-full bg-surface-container-highest rounded-full h-2">
            <div
              className="h-2 rounded-full accent-gradient transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-label-sm text-on-surface-variant">Last read {timeAgo(lastReadAt)}</span>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onClick={e => e.stopPropagation()}
            onChange={e => {
              e.stopPropagation();
              updateProgress(bookId, parseInt(e.target.value));
            }}
            className="w-24 cursor-pointer accent-slider"
          />
        </div>
      </div>
    </div>
  );
};

const CompletedCard: React.FC<{ bookId: string; completedAt?: string; totalMinutesRead: number }> = ({ bookId, completedAt, totalMinutesRead }) => {
  const navigate = useNavigate();
  const book = getBook(bookId);
  if (!book) return null;

  const formatDate = (iso?: string) => iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'Unknown';

  const hrs = Math.floor(totalMinutesRead / 60);
  const mins = totalMinutesRead % 60;

  return (
    <div
      className="glass-card rounded-2xl p-5 flex gap-5 items-start book-card-hover transition-all duration-300 cursor-pointer group"
      onClick={() => navigate(`/book/${bookId}`)}
    >
      <div className="relative shrink-0">
        <img
          src={book.cover}
          alt={book.title}
          className="w-20 h-28 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
        />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-md">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1", fontSize: '16px' }}>
            check
          </span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-headline-md text-body-lg font-bold mb-0.5 line-clamp-1">{book.title}</h3>
        <p className="text-label-md text-on-surface-variant mb-3">{book.author}</p>
        <div className="flex flex-wrap gap-3 text-label-sm">
          <span className="flex items-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined text-emerald-500" style={{ fontSize: '16px' }}>event</span>
            Finished {formatDate(completedAt)}
          </span>
          <span className="flex items-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px' }}>schedule</span>
            {hrs > 0 ? `${hrs}h ` : ''}{mins}m read
          </span>
        </div>
        <div className="mt-3 flex items-center gap-1">
          {[1,2,3,4,5].map(s => (
            <span key={s} className="material-symbols-outlined text-amber-400" style={{ fontVariationSettings: s <= Math.round(book.rating) ? "'FILL' 1" : "'FILL' 0", fontSize: '16px' }}>star</span>
          ))}
          <span className="text-label-sm text-on-surface-variant ml-1">({book.rating.toFixed(1)})</span>
        </div>
      </div>
    </div>
  );
};

// Pure-CSS SVG bar chart
const BarChart: React.FC<{ data: typeof WEEKLY_DATA }> = ({ data }) => {
  const max = Math.max(...data.map(d => d.minutes));
  return (
    <div className="flex items-end gap-2 h-32 w-full">
      {data.map(({ day, minutes }) => {
        const pct = (minutes / max) * 100;
        return (
          <div key={day} className="flex-1 flex flex-col items-center gap-1 group">
            <div className="relative w-full flex flex-col items-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-label-sm text-primary font-bold absolute -top-6 whitespace-nowrap">
                {minutes}m
              </span>
              <div
                className="w-full rounded-t-lg accent-gradient opacity-70 group-hover:opacity-100 transition-all duration-300"
                style={{ height: `${pct}%`, minHeight: '4px' }}
              />
            </div>
            <span className="text-label-sm text-on-surface-variant">{day}</span>
          </div>
        );
      })}
    </div>
  );
};

// Horizontal bar chart for monthly books read
const HBarChart: React.FC<{ data: typeof MONTHLY_DATA }> = ({ data }) => {
  const max = Math.max(...data.map(d => d.books));
  return (
    <div className="space-y-3">
      {data.map(({ month, books }) => (
        <div key={month} className="flex items-center gap-3">
          <span className="text-label-sm text-on-surface-variant w-8">{month}</span>
          <div className="flex-1 bg-surface-container-highest rounded-full h-3 overflow-hidden">
            <div
              className="h-3 rounded-full accent-gradient transition-all duration-700"
              style={{ width: `${(books / max) * 100}%` }}
            />
          </div>
          <span className="text-label-sm font-bold text-primary w-4 text-right">{books}</span>
        </div>
      ))}
    </div>
  );
};

// Donut chart (pure CSS/SVG)
const DonutChart: React.FC<{ data: typeof CATEGORY_DATA }> = ({ data }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;
  const r = 60, cx = 70, cy = 70;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 140 140" className="w-36 h-36 shrink-0">
        {data.map(({ label, value, color }) => {
          const pct = value / total;
          const dasharray = `${pct * circumference} ${circumference}`;
          const rotation = (cumulative / total) * 360 - 90;
          cumulative += value;
          return (
            <circle
              key={label}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={color}
              strokeWidth="20"
              strokeDasharray={dasharray}
              strokeDashoffset="0"
              transform={`rotate(${rotation} ${cx} ${cy})`}
              className="transition-all duration-700"
            />
          );
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" className="text-xs" fill="#191c1e" fontWeight="700" fontSize="18">
          {total}%
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill="#7b7486" fontSize="9">
          genres
        </text>
      </svg>
      <div className="space-y-2 flex-1">
        {data.map(({ label, value, color }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
            <span className="text-label-sm text-on-surface-variant flex-1 truncate">{label}</span>
            <span className="text-label-sm font-bold" style={{ color }}>{value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Main Page ────────────────────────────────────────────────

const ReadingHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('in_progress');
  const { inProgressBooks, completedBooks } = useReadingHistory();

  const totalBooksRead = completedBooks.length;
  const totalMinutes = [...inProgressBooks, ...completedBooks].reduce((s, e) => s + e.totalMinutesRead, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const avgRating = completedBooks.length > 0
    ? (completedBooks.map(e => getBook(e.bookId)?.rating ?? 0).reduce((s, r) => s + r, 0) / completedBooks.length).toFixed(1)
    : '—';

  const TABS: { id: Tab; label: string; icon: string; count?: number }[] = [
    { id: 'in_progress', label: 'Continue Reading', icon: 'menu_book',    count: inProgressBooks.length },
    { id: 'completed',   label: 'Completed',        icon: 'check_circle', count: completedBooks.length },
    { id: 'analytics',   label: 'Analytics',        icon: 'insights' },
  ];

  return (
    <div className="bg-surface text-on-surface min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5" />
      </div>

      <Navbar />
      <Sidebar />

      <main className="md:ml-sidebar-width pt-28 px-container-padding pb-section-gap max-w-[1440px] mx-auto min-h-screen">

        {/* ── Header ── */}
        <section className="mb-10">
          <h1 className="font-headline-lg text-headline-lg mb-1 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              history
            </span>
            Reading History
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Track your reading journey, manage progress, and explore your reading analytics.
          </p>
        </section>

        {/* ── KPI Cards ── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-gutter mb-10">
          {[
            { icon: 'auto_stories', label: 'Books In Progress', value: inProgressBooks.length, color: 'text-primary', bg: 'bg-primary/10' },
            { icon: 'check_circle', label: 'Books Completed',   value: totalBooksRead,         color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { icon: 'schedule',     label: 'Total Hours Read',  value: `${totalHours}h`,        color: 'text-secondary', bg: 'bg-secondary/10' },
            { icon: 'star',         label: 'Avg Book Rating',   value: avgRating,               color: 'text-amber-500', bg: 'bg-amber-50' },
          ].map(({ icon, label, value, color, bg }) => (
            <div key={label} className="glass-card rounded-2xl p-6 flex flex-col gap-3">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center ${color}`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
              </div>
              <div>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
                <p className="text-label-sm text-on-surface-variant">{label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ── Tabs ── */}
        <div className="flex gap-2 mb-8 border-b border-outline-variant/30">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 font-semibold text-label-md transition-all border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1", fontSize: '18px' }}>
                {tab.icon}
              </span>
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-label-sm px-2 py-0.5 rounded-full font-bold ${
                  activeTab === tab.id ? 'bg-primary/10 text-primary' : 'bg-surface-container text-on-surface-variant'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}

        {/* Continue Reading */}
        {activeTab === 'in_progress' && (
          inProgressBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 text-center">
              <div className="w-28 h-28 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-6xl text-primary/20" style={{ fontVariationSettings: "'FILL' 1" }}>
                  menu_book
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-2">Nothing in progress</h3>
              <p className="text-on-surface-variant max-w-sm mb-8">
                Open any book and tap "Start Reading" to begin tracking your progress here.
              </p>
              <a href="/search" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl ai-gradient-bg text-white font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
                <span className="material-symbols-outlined">search</span>
                Browse Books
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
              {inProgressBooks.map(entry => (
                <ProgressCard
                  key={entry.bookId}
                  bookId={entry.bookId}
                  progress={entry.progress}
                  lastReadAt={entry.lastReadAt}
                />
              ))}
            </div>
          )
        )}

        {/* Completed */}
        {activeTab === 'completed' && (
          completedBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 text-center">
              <div className="w-28 h-28 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-6xl text-emerald-200" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-2">No completed books yet</h3>
              <p className="text-on-surface-variant max-w-sm mb-8">
                Mark a book as completed from its details page or slide the progress to 100%.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
              {completedBooks.map(entry => (
                <CompletedCard
                  key={entry.bookId}
                  bookId={entry.bookId}
                  completedAt={entry.completedAt}
                  totalMinutesRead={entry.totalMinutesRead}
                />
              ))}
            </div>
          )
        )}

        {/* Analytics */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">

            {/* Weekly reading time bar chart */}
            <div className="xl:col-span-2 glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-headline-md text-body-lg font-bold">Daily Reading Time</h3>
                  <p className="text-label-md text-on-surface-variant">Minutes read per day this week</p>
                </div>
                <div className="px-3 py-1.5 bg-primary/10 rounded-full text-primary text-label-sm font-bold">
                  This Week
                </div>
              </div>
              <BarChart data={WEEKLY_DATA} />
              <div className="mt-4 flex items-center justify-between text-label-sm text-on-surface-variant border-t border-outline-variant/20 pt-4">
                <span>Total: <span className="font-bold text-primary">600 min</span></span>
                <span>Daily avg: <span className="font-bold text-primary">85 min</span></span>
                <span>Best day: <span className="font-bold text-primary">Sat · 180 min</span></span>
              </div>
            </div>

            {/* Genre breakdown donut */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-headline-md text-body-lg font-bold mb-1">Genre Breakdown</h3>
              <p className="text-label-md text-on-surface-variant mb-6">Your reading interests</p>
              <DonutChart data={CATEGORY_DATA} />
            </div>

            {/* Monthly books read */}
            <div className="xl:col-span-2 glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-headline-md text-body-lg font-bold">Books Completed per Month</h3>
                  <p className="text-label-md text-on-surface-variant">Your monthly reading cadence</p>
                </div>
                <div className="px-3 py-1.5 bg-secondary/10 rounded-full text-secondary text-label-sm font-bold">
                  Last 6 Months
                </div>
              </div>
              <HBarChart data={MONTHLY_DATA} />
            </div>

            {/* Reading streak */}
            <div className="glass-card rounded-2xl p-6 flex flex-col">
              <h3 className="font-headline-md text-body-lg font-bold mb-1">Reading Streak</h3>
              <p className="text-label-md text-on-surface-variant mb-6">Consistency score</p>
              <div className="flex-1 flex flex-col items-center justify-center gap-4">
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#e6e8ea" strokeWidth="12" />
                    <circle
                      cx="60" cy="60" r="50"
                      fill="none"
                      stroke="url(#grad)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${(14 / 21) * 314} 314`}
                    />
                    <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6d28d9" />
                        <stop offset="100%" stopColor="#2170e4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-primary">14</span>
                    <span className="text-label-sm text-on-surface-variant">days</span>
                  </div>
                </div>
                <p className="text-center text-label-md text-on-surface-variant">
                  🔥 <span className="font-bold text-on-surface">14-day streak!</span><br />
                  Best: 21 days
                </p>
              </div>
            </div>

          </div>
        )}

      </main>

      <footer className="md:ml-sidebar-width bg-surface border-t border-outline-variant/30 py-8 mt-section-gap relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center px-container-padding max-w-[1440px] mx-auto gap-4 text-label-sm text-on-surface-variant">
          <p>© 2024 Aethelgard AI. Precision in knowledge.</p>
          <div className="flex gap-8">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReadingHistory;
