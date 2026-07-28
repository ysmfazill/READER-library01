import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { SearchBar } from '../components/SearchBar';
import { SearchFilterPanel } from '../components/SearchFilterPanel';
import { SearchAISuggestions } from '../components/SearchAISuggestions';
import { BookCard } from '../components/BookCard';
import { RECOMMENDED_BOOKS } from '../utils/placeholderData';

export const SearchBooks: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    yearFrom: '',
    yearTo: '',
    minRating: 0
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      yearFrom: '',
      yearTo: '',
      minRating: 0
    });
  };

  const filteredBooks = useMemo(() => {
    return RECOMMENDED_BOOKS.filter(book => {
      // Text search
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
        book.title.toLowerCase().includes(q) || 
        book.author.toLowerCase().includes(q) || 
        book.category.toLowerCase().includes(q) ||
        (book.keywords && book.keywords.some(k => k.toLowerCase().includes(q)));
      
      // Category filter
      const matchesCategory = !filters.category || book.category === filters.category;
      
      // Rating filter
      const matchesRating = book.rating >= filters.minRating;
      
      // Year filter
      const matchesYearFrom = !filters.yearFrom || (book.publicationYear && book.publicationYear >= parseInt(filters.yearFrom));
      const matchesYearTo = !filters.yearTo || (book.publicationYear && book.publicationYear <= parseInt(filters.yearTo));

      return matchesSearch && matchesCategory && matchesRating && matchesYearFrom && matchesYearTo;
    });
  }, [searchQuery, filters]);

  return (
    <div className="bg-surface text-on-surface min-h-screen relative overflow-x-hidden">
      {/* Background styling for Search */}
      <div className="fixed inset-0 w-full h-full -z-10 opacity-40 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10"></div>
      </div>

      <Navbar />
      <Sidebar />

      <main className="md:ml-sidebar-width pt-28 px-container-padding pb-section-gap max-w-[1440px] mx-auto min-h-screen">
        <section className="mb-10 text-center md:text-left">
          <h1 className="font-headline-lg text-headline-lg mb-2 flex items-center gap-3 justify-center md:justify-start">
            <span>🔍</span> Search Books
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Discover books from thousands of titles using AI-powered search.</p>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <div className="mt-4 flex flex-wrap items-center gap-3 justify-center">
            <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider opacity-60">Recent:</span>
            {['Quantum Physics', 'Nietzsche', 'Deep Learning', 'Modernism'].map(term => (
              <button 
                key={term}
                onClick={() => setSearchQuery(term)}
                className="px-3 py-1.5 rounded-full bg-surface-container-low text-label-sm font-label-sm text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all"
              >
                {term}
              </button>
            ))}
          </div>
        </section>

        <section className="mb-10 overflow-x-auto custom-scrollbar pb-2">
          <div className="flex gap-3">
            <button 
              onClick={() => handleFilterChange({ category: '' })}
              className={`px-6 py-2 rounded-full font-semibold text-label-md whitespace-nowrap transition-all ${
                !filters.category ? 'ai-gradient-bg text-white' : 'bg-white/60 border border-outline-variant/30 text-on-surface-variant hover:border-primary/40 hover:text-primary'
              }`}
            >
              All Titles
            </button>
            {['Artificial Intelligence', 'Philosophy', 'Science', 'Business', 'History', 'Literature'].map(cat => (
              <button 
                key={cat}
                onClick={() => handleFilterChange({ category: cat })}
                className={`px-6 py-2 rounded-full font-semibold text-label-md whitespace-nowrap transition-all ${
                  filters.category === cat ? 'ai-gradient-bg text-white' : 'bg-white/60 border border-outline-variant/30 text-on-surface-variant hover:border-primary/40 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-gutter">
          <div className="xl:col-span-3">
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {filteredBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="material-symbols-outlined text-6xl text-primary/30 mb-4">search_off</span>
                <h3 className="font-headline-md text-headline-md mb-2 text-on-surface">No books found</h3>
                <p className="text-on-surface-variant">We couldn't find any books matching your search. Try different keywords or filters.</p>
                <button 
                  onClick={() => { setSearchQuery(''); resetFilters(); }}
                  className="mt-6 px-6 py-2 rounded-xl ai-gradient-bg text-white font-semibold shadow-md"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
          
          <div className="space-y-gutter">
            <SearchFilterPanel 
              onFilterChange={handleFilterChange} 
              onReset={resetFilters} 
            />
            <SearchAISuggestions 
              onSuggestionClick={setSearchQuery} 
            />
          </div>
        </div>
      </main>

      <footer className="bg-surface dark:bg-surface-dim border-t border-outline-variant/30 py-8 mt-section-gap relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center px-container-padding max-w-[1440px] mx-auto gap-4">
          <p className="font-label-sm text-label-sm text-on-surface-variant">© 2024 Aethelgard AI. Precision in knowledge.</p>
          <div className="flex gap-8">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">API Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SearchBooks;
