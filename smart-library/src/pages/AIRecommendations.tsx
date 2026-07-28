import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { BookCard } from '../components/BookCard';
import { getPersonalizedRecommendations } from '../utils/aiEngine';
import type { Book } from '../types';

const AIRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'High Match', 'New Releases', 'Short Reads'];

  useEffect(() => {
    // Simulate AI loading delay
    const timer = setTimeout(() => {
      // Pass empty array for now to just get top rated,
      // in a real app this would pass the user's selected interests
      const books = getPersonalizedRecommendations([]);
      setRecommendations(books);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredBooks = recommendations.filter(book => {
    if (activeFilter === 'High Match') return (book.matchPercent || 0) > 90;
    if (activeFilter === 'New Releases') return (book.publicationYear || 0) > 2020;
    if (activeFilter === 'Short Reads') return (book.pages || 999) < 300;
    return true;
  });

  return (
    <div className="bg-surface text-on-surface min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      </div>

      <Navbar />
      <Sidebar />

      <main className="md:ml-sidebar-width pt-28 px-container-padding pb-section-gap max-w-[1440px] mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <section className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ai-gradient-bg text-white mb-6 animate-pulse">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>neurology</span>
            <span className="text-label-sm font-bold tracking-widest uppercase">AI Engine Active</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg mb-4">Curated for Your Mind</h1>
          <p className="font-body-md text-body-lg text-on-surface-variant">
            Aethelgard AI has analyzed your reading patterns and interests to curate these selections. 
            The higher the match percentage, the stronger the conceptual alignment.
          </p>
        </section>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-label-md font-semibold transition-all ${
                activeFilter === filter
                  ? 'ai-gradient-bg text-white shadow-lg shadow-primary/20 scale-105'
                  : 'bg-surface-container hover:bg-primary/10 text-on-surface-variant hover:text-primary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter opacity-60">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="w-full aspect-[2/3] bg-surface-container rounded-2xl mb-4" />
                <div className="h-5 bg-surface-container rounded w-3/4 mb-2" />
                <div className="h-4 bg-surface-container rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter fade-in">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 fade-in">
            <span className="material-symbols-outlined text-6xl text-primary/30 mb-4">search_off</span>
            <h3 className="font-headline-md text-headline-md mb-2">No exact matches</h3>
            <p className="text-on-surface-variant">Try adjusting your filters to see more recommendations.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AIRecommendations;
