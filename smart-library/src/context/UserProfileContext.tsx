import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// ── Types ────────────────────────────────────────────────────
export type Theme = 'light' | 'dark' | 'system';
export type FontSize = 'small' | 'medium' | 'large';
export type Language = 'en' | 'ar' | 'fr' | 'de';

export interface UserProfile {
  name: string;
  email: string;
  username: string;
  bio: string;
  avatar: string;
  tier: 'Scholar' | 'Researcher' | 'Archivist' | 'Librarian';
  joinDate: string;
  location: string;
  website: string;
  role: 'USER' | 'ADMIN';
}

export interface UserSettings {
  theme: Theme;
  fontSize: FontSize;
  language: Language;
  // Notifications
  notifyNewRecommendations: boolean;
  notifyReadingReminders: boolean;
  notifyNewArrivals: boolean;
  notifyWeeklyDigest: boolean;
  // Privacy
  profilePublic: boolean;
  showReadingActivity: boolean;
  shareProgress: boolean;
  // Display
  compactMode: boolean;
  animationsEnabled: boolean;
  autoPlayPreviews: boolean;
}

interface UserProfileContextType {
  profile: UserProfile;
  user: UserProfile;
  settings: UserSettings;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateSettings: (updates: Partial<UserSettings>) => void;
  resetSettings: () => void;
}

// ── Defaults ─────────────────────────────────────────────────
const DEFAULT_PROFILE: UserProfile = {
  name: 'Alex Reinholt',
  email: 'alex.reinholt@aethelgard.ai',
  username: '@a.reinholt',
  bio: 'Researcher at the intersection of AI and cognitive science. Passionate about machine learning, philosophy of mind, and the ethics of artificial consciousness.',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtfYwR2Af8j62wIDT-avwwlpuEzQK7UlUSyB0yq10RH1zFh8U1GQwu4iQDyRn_1gxXGyo0vC4fm2ngZhF3xckmOgF_OVtfIqLBEy_0q0X0Kf87dxCt-DEbxiATFaPZgQbqy2iC6T6OTVl-rhcdE0_1K9StdJV8x_SQGz6R9ql2CS3CUPo__HdcTwMN7HfO3UKNQ6VPpexvpVdpkuVsdtEPeAyQ5tG-FMaAE3SlAupoaU3iNBxkF8U',
  tier: 'Researcher',
  joinDate: 'March 2023',
  location: 'Cambridge, UK',
  website: 'aethelgard.ai/u/areinholt',
  role: 'USER',
};

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'light',
  fontSize: 'medium',
  language: 'en',
  notifyNewRecommendations: true,
  notifyReadingReminders: true,
  notifyNewArrivals: false,
  notifyWeeklyDigest: true,
  profilePublic: true,
  showReadingActivity: true,
  shareProgress: false,
  compactMode: false,
  animationsEnabled: true,
  autoPlayPreviews: false,
};

// ── Storage helpers ───────────────────────────────────────────
const PROFILE_KEY = 'aethelgard_profile';
const SETTINGS_KEY = 'aethelgard_settings';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return { ...fallback, ...JSON.parse(raw) } as T;
  } catch {/* ignore */ }
  return fallback;
}

function saveToStorage<T>(key: string, data: T): void {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch {/* ignore */ }
}

// ── Context ───────────────────────────────────────────────────
const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => loadFromStorage(PROFILE_KEY, DEFAULT_PROFILE));
  const [settings, setSettings] = useState<UserSettings>(() => loadFromStorage(SETTINGS_KEY, DEFAULT_SETTINGS));

  // Persist whenever they change
  useEffect(() => { saveToStorage(PROFILE_KEY, profile); }, [profile]);
  useEffect(() => { saveToStorage(SETTINGS_KEY, settings); }, [settings]);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  }, []);

  const updateSettings = useCallback((updates: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return (
    <UserProfileContext.Provider value={{ profile, user: profile, settings, updateProfile, updateSettings, resetSettings }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = (): UserProfileContextType => {
  const ctx = useContext(UserProfileContext);
  if (!ctx) throw new Error('useUserProfile must be used inside UserProfileProvider');
  return ctx;
};
