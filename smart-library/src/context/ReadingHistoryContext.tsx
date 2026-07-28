import React, { createContext, useContext, useState, useCallback } from 'react';

export interface ReadingEntry {
  bookId: string;
  progress: number;          // 0–100
  startedAt: string;         // ISO date string
  completedAt?: string;      // ISO date string, set when progress === 100
  lastReadAt: string;        // ISO date string
  totalMinutesRead: number;  // Simulated reading time in minutes
}

interface ReadingHistoryContextType {
  history: Map<string, ReadingEntry>;
  startReading: (bookId: string) => void;
  updateProgress: (bookId: string, progress: number) => void;
  markCompleted: (bookId: string) => void;
  getEntry: (bookId: string) => ReadingEntry | undefined;
  isReading: (bookId: string) => boolean;
  isCompleted: (bookId: string) => boolean;
  inProgressBooks: ReadingEntry[];
  completedBooks: ReadingEntry[];
}

const ReadingHistoryContext = createContext<ReadingHistoryContextType | undefined>(undefined);

// Helper to get a random reading time based on progress
const estimateMinutes = (progress: number) => Math.round((progress / 100) * 480);

// Seed dummy history so the page isn't empty on first load
const SEED_HISTORY: ReadingEntry[] = [
  { bookId: 'cr1', progress: 65, startedAt: '2024-07-10T09:00:00Z', lastReadAt: '2024-07-25T20:30:00Z', totalMinutesRead: 312 },
  { bookId: 'cr2', progress: 30, startedAt: '2024-07-18T14:00:00Z', lastReadAt: '2024-07-27T22:00:00Z', totalMinutesRead: 144 },
  { bookId: '3',   progress: 100, startedAt: '2024-06-01T08:00:00Z', completedAt: '2024-07-01T20:00:00Z', lastReadAt: '2024-07-01T20:00:00Z', totalMinutesRead: 480 },
  { bookId: '5',   progress: 100, startedAt: '2024-05-10T10:00:00Z', completedAt: '2024-06-15T18:00:00Z', lastReadAt: '2024-06-15T18:00:00Z', totalMinutesRead: 396 },
];

const buildSeed = (): Map<string, ReadingEntry> => {
  const m = new Map<string, ReadingEntry>();
  SEED_HISTORY.forEach(e => m.set(e.bookId, e));
  return m;
};

export const ReadingHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<Map<string, ReadingEntry>>(buildSeed);

  const now = () => new Date().toISOString();

  const startReading = useCallback((bookId: string) => {
    setHistory(prev => {
      if (prev.has(bookId)) return prev; // already started
      const next = new Map(prev);
      next.set(bookId, {
        bookId,
        progress: 1,
        startedAt: now(),
        lastReadAt: now(),
        totalMinutesRead: 1,
      });
      return next;
    });
  }, []);

  const updateProgress = useCallback((bookId: string, progress: number) => {
    setHistory(prev => {
      const existing = prev.get(bookId);
      const clamped = Math.min(100, Math.max(0, progress));
      const next = new Map(prev);
      next.set(bookId, {
        ...(existing ?? { bookId, startedAt: now() }),
        progress: clamped,
        lastReadAt: now(),
        completedAt: clamped === 100 ? now() : existing?.completedAt,
        totalMinutesRead: estimateMinutes(clamped),
      });
      return next;
    });
  }, []);

  const markCompleted = useCallback((bookId: string) => {
    updateProgress(bookId, 100);
  }, [updateProgress]);

  const getEntry = useCallback((bookId: string) => history.get(bookId), [history]);
  const isReading = useCallback((bookId: string) => {
    const e = history.get(bookId);
    return !!e && e.progress < 100;
  }, [history]);
  const isCompleted = useCallback((bookId: string) => {
    const e = history.get(bookId);
    return !!e && e.progress >= 100;
  }, [history]);

  const entries = Array.from(history.values());
  const inProgressBooks = entries.filter(e => e.progress < 100).sort(
    (a, b) => new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime()
  );
  const completedBooks = entries.filter(e => e.progress >= 100).sort(
    (a, b) => new Date(b.completedAt ?? b.lastReadAt).getTime() - new Date(a.completedAt ?? a.lastReadAt).getTime()
  );

  return (
    <ReadingHistoryContext.Provider value={{
      history, startReading, updateProgress, markCompleted,
      getEntry, isReading, isCompleted, inProgressBooks, completedBooks,
    }}>
      {children}
    </ReadingHistoryContext.Provider>
  );
};

export const useReadingHistory = (): ReadingHistoryContextType => {
  const ctx = useContext(ReadingHistoryContext);
  if (!ctx) throw new Error('useReadingHistory must be used within a ReadingHistoryProvider');
  return ctx;
};
