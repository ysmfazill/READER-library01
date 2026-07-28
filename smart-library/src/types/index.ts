export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  avatar?: string;
  tier?: string;
  role?: 'USER' | 'ADMIN';
}

export interface Interest {
  id: number;
  name: string;
  icon: string;
  desc: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  category: string;
  matchPercent?: number;
  matchReason?: string;
  progress?: number;
  description?: string;
  publicationYear?: number;
  language?: string;
  pages?: number;
  aiSummary?: string;
  keywords?: string[];
  similarBooks?: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  selectedInterests: Interest[];
}
