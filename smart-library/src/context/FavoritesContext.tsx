import React, { createContext, useContext, useState, useCallback } from 'react';

interface FavoritesContextType {
  favoriteIds: Set<string>;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const addFavorite = useCallback((id: string) => {
    setFavoriteIds(prev => new Set(prev).add(id));
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavoriteIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favoriteIds.has(id), [favoriteIds]);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, addFavorite, removeFavorite, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider');
  return ctx;
};
