import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../types';
import { useFavorites } from '../context/FavoritesContext';

interface BookCardProps {
  book: Book;
  className?: string;
  /** In Favorites page, show a red filled heart always visible (not just on hover) */
  alwaysShowFavorite?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({ book, className = '', alwaysShowFavorite = false }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(book.id);

  return (
    <div
      className={`glass-card rounded-2xl overflow-hidden book-card-hover transition-all duration-300 p-4 cursor-pointer ${className}`}
      onClick={() => navigate(`/book/${book.id}`)}
    >
      <div className="relative mb-4 group">
        <img
          className="w-full aspect-[2/3] object-cover rounded-xl shadow-md"
          src={book.cover}
          alt={book.title}
        />
        {book.matchPercent && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-sm ai-gradient-text" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <span className="text-label-sm font-bold ai-gradient-text">{book.matchPercent}% Match</span>
          </div>
        )}
        {/* Favorite button — always visible when favorited or alwaysShowFavorite; appears on hover otherwise */}
        <button
          className={`absolute bottom-3 right-3 p-2 rounded-full shadow-lg transition-all duration-200 ${
            favorited
              ? 'bg-red-500 text-white opacity-100 scale-110'
              : `bg-white/80 hover:bg-white text-primary ${alwaysShowFavorite ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(book.id);
          }}
          title={favorited ? 'Remove from Favorites' : 'Add to Favorites'}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: favorited ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>
      </div>

      <h3 className="font-headline-md text-body-lg mb-1 line-clamp-1">{book.title}</h3>
      <p className="font-label-md text-label-md text-on-surface-variant mb-3">{book.author}</p>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex text-amber-400">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFull = book.rating >= star;
            const isHalf = !isFull && book.rating >= star - 0.5;
            return (
              <span
                key={star}
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: isFull || isHalf ? "'FILL' 1" : "'FILL' 0" }}
              >
                {isFull ? 'star' : isHalf ? 'star_half' : 'star_outline'}
              </span>
            );
          })}
        </div>
        <span className="text-label-sm font-medium text-on-surface-variant opacity-60">({book.rating.toFixed(1)})</span>
      </div>

      <div className="flex flex-col gap-2">
        <button className="w-full py-2.5 rounded-lg border-1.5 border-primary/30 text-primary hover:bg-primary/5 font-semibold text-label-md transition-all">
          View Details
        </button>
        <button
          className="w-full py-2.5 rounded-lg ai-gradient-bg text-white font-semibold text-label-md flex items-center justify-center gap-2 shadow-md"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="material-symbols-outlined text-sm">chat_bubble</span>
          Ask AI
        </button>
      </div>
    </div>
  );
};
