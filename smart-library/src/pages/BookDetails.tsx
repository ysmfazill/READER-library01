import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { RECOMMENDED_BOOKS } from '../utils/placeholderData';
import { useReadingHistory } from '../context/ReadingHistoryContext';
import { useFavorites } from '../context/FavoritesContext';

export const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { startReading, updateProgress, markCompleted, getEntry, isReading, isCompleted } = useReadingHistory();
  const { toggleFavorite, isFavorite } = useFavorites();

  const book = RECOMMENDED_BOOKS.find(b => b.id === id);

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-surface">
        <h2 className="text-2xl font-bold text-on-surface">Book not found</h2>
        <button 
          onClick={() => navigate('/search')}
          className="mt-4 px-6 py-2 rounded-xl ai-gradient-bg text-white"
        >
          Back to Search
        </button>
      </div>
    );
  }

  // Find similar books based on category or from similarBooks array
  const similarBooks = RECOMMENDED_BOOKS.filter(b =>
    b.id !== book.id && (book.similarBooks?.includes(b.id) || b.category === book.category)
  ).slice(0, 3);

  const entry = getEntry(book.id);
  const reading = isReading(book.id);
  const completed = isCompleted(book.id);
  const favorited = isFavorite(book.id);

  return (
    <div className="bg-surface text-on-surface min-h-screen relative overflow-x-hidden selection:bg-primary/20">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5"></div>
      </div>

      <Sidebar />
      {/* Book details navbar differs slightly, but we reuse Navbar for consistency, or implement custom logic. We'll use standard Navbar but with slight adjustments if needed. Actually we can just use the standard Navbar. */}
      <Navbar />

      <main className="relative z-10 pt-20 md:ml-sidebar-width min-h-screen px-container-padding pb-section-gap">
        <div className="max-w-[1440px] mx-auto mt-10">
          
          <nav className="flex items-center gap-2 text-label-sm text-on-surface-variant/60 mb-8 fade-in">
            <span className="cursor-pointer hover:text-primary" onClick={() => navigate('/search')}>Search</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>{book.category}</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-bold">{book.title}</span>
          </nav>

          <div className="grid grid-cols-12 gap-gutter">
            
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-8 fade-in">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(109,40,217,0.25)] hover-lift">
                  <img 
                    className="w-full h-full object-cover" 
                    src={book.cover} 
                    alt={book.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="font-display text-headline-lg font-bold text-on-surface">{book.title}</h2>
                  <p className="text-headline-md text-primary font-medium">{book.author}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex text-[#FFB800]">
                    {[1, 2, 3, 4, 5].map(star => {
                      const isFull = book.rating >= star;
                      const isHalf = !isFull && book.rating >= star - 0.5;
                      return (
                        <span key={star} className="material-symbols-outlined" style={{ fontVariationSettings: isFull || isHalf ? "'FILL' 1" : "'FILL' 0" }}>
                          {isFull ? 'star' : isHalf ? 'star_half' : 'star_outline'}
                        </span>
                      );
                    })}
                  </div>
                  <span className="font-label-md text-on-surface font-bold">{book.rating.toFixed(1)}</span>
                  <span className="text-label-md text-on-surface-variant/60">(1.2k reviews)</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-label-sm">{book.category}</span>
                  {book.keywords?.slice(0, 2).map(kw => (
                    <span key={kw} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-label-sm">{kw}</span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-b border-outline-variant/30 py-6">
                <div>
                  <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Language</p>
                  <p className="text-body-md font-medium">{book.language || 'English'}</p>
                </div>
                <div>
                  <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Year</p>
                  <p className="text-body-md font-medium">{book.publicationYear || '2024'}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {/* Progress bar if already reading */}
                {(reading || completed) && entry && (
                  <div className="glass-card p-4 rounded-xl border border-white/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                        {completed ? '✅ Completed' : '📖 Reading Progress'}
                      </span>
                      <span className="text-label-md font-bold text-primary">{entry.progress}%</span>
                    </div>
                    <div className="w-full bg-surface-container-highest rounded-full h-2 mb-3">
                      <div
                        className="h-2 rounded-full accent-gradient transition-all duration-500"
                        style={{ width: `${entry.progress}%` }}
                      />
                    </div>
                    {!completed && (
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={entry.progress}
                        onChange={e => updateProgress(book.id, parseInt(e.target.value))}
                        className="w-full accent-slider cursor-pointer"
                      />
                    )}
                    {!completed && (
                      <button
                        onClick={() => markCompleted(book.id)}
                        className="mt-2 w-full py-2 rounded-lg border border-primary/30 text-primary text-label-sm font-semibold hover:bg-primary/5 transition-all"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </div>
                )}

                <button
                  onClick={() => startReading(book.id)}
                  disabled={completed}
                  className={`h-14 rounded-xl font-bold text-body-md shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 ${
                    completed
                      ? 'bg-surface-container text-on-surface-variant cursor-not-allowed'
                      : reading
                        ? 'accent-gradient text-white shadow-primary/25 hover:shadow-primary/40'
                        : 'accent-gradient text-white shadow-primary/25 hover:shadow-primary/40'
                  }`}
                >
                  <span className="material-symbols-outlined">
                    {completed ? 'check_circle' : reading ? 'play_arrow' : 'menu_book'}
                  </span>
                  {completed ? 'Finished Reading' : reading ? 'Continue Reading' : 'Start Reading'}
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => toggleFavorite(book.id)}
                    className={`flex-1 h-12 border-1.5 rounded-xl font-semibold text-label-md transition-colors flex items-center justify-center gap-2 ${
                      favorited
                        ? 'bg-red-50 border-red-300 text-red-500'
                        : 'border-primary/30 text-primary hover:bg-primary/5'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: favorited ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                    {favorited ? 'Saved to Favorites' : 'Add to Favorites'}
                  </button>
                  <button className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all">
                    <span className="material-symbols-outlined">download</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-8 flex flex-col gap-10 fade-in" style={{ animationDelay: '0.2s' }}>
              
              <section>
                <h3 className="text-label-sm text-on-surface-variant uppercase tracking-widest font-bold mb-4">Synopsis</h3>
                <p className="font-body-lg text-body-lg text-on-surface leading-relaxed max-w-3xl">
                  {book.description || `A groundbreaking exploration into the convergence of ideas in ${book.category}. ${book.author} posits that the next evolution lies in the harmonious resonance between known theories and future possibilities.`}
                </p>
              </section>

              <section className="grid grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-xl border border-white/20 flex flex-col items-center text-center bg-white/40">
                  <span className="material-symbols-outlined text-primary mb-2">description</span>
                  <span className="text-headline-md font-bold">{book.pages || 412}</span>
                  <span className="text-label-sm text-on-surface-variant">Pages</span>
                </div>
                <div className="glass-card p-6 rounded-xl border border-white/20 flex flex-col items-center text-center bg-white/40">
                  <span className="material-symbols-outlined text-primary mb-2">trending_up</span>
                  <span className="text-headline-md font-bold">Advanced</span>
                  <span className="text-label-sm text-on-surface-variant">Difficulty</span>
                </div>
                <div className="glass-card p-6 rounded-xl border border-white/20 flex flex-col items-center text-center bg-white/40">
                  <span className="material-symbols-outlined text-primary mb-2">schedule</span>
                  <span className="text-headline-md font-bold">8h 30m</span>
                  <span className="text-label-sm text-on-surface-variant">Est. Reading Time</span>
                </div>
              </section>

              <section className="glass-card p-8 rounded-xl relative overflow-hidden group bg-white/40">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-primary text-[120px]">neurology</span>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                    <h3 className="font-headline-md text-headline-md">AI Insights Summary</h3>
                  </div>
                  <p className="text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    {book.aiSummary || 'This volume provides an in-depth look at its subject matter, detailing core principles and practical examples. Key chapters focus on the foundational elements and their modern applications in the field.'}
                  </p>
                  <button className="flex items-center gap-2 text-primary font-bold text-label-md hover:underline active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-[18px]">refresh</span>
                    Regenerate Summary
                  </button>
                </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-on-surface">Why Recommended</h4>
                    <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-black">{book.matchPercent || 98}% MATCH</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-label-md">
                      <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                      Matches your interest in {book.category}
                    </li>
                    <li className="flex items-start gap-3 text-label-md">
                      <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                      High rating in your preferred genre
                    </li>
                  </ul>
                </div>

                <div className="glass-card p-6 rounded-xl flex flex-col gap-3 bg-white/40">
                  <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-primary/5 transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">star</span>
                      <span className="text-label-md font-semibold">Rate Book</span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant/40">chevron_right</span>
                  </button>
                  <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-primary/5 transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">edit</span>
                      <span className="text-label-md font-semibold">Write Review</span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant/40">chevron_right</span>
                  </button>
                </div>
              </div>

              <section className="glass-card rounded-xl border border-primary/20 shadow-xl overflow-hidden bg-white/40">
                <div className="bg-primary/10 px-8 py-4 border-b border-primary/10 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">chat_bubble</span>
                  <span className="font-bold text-primary">Ask Aethelgard AI</span>
                </div>
                <div className="p-8">
                  <div className="relative mb-4">
                    <input 
                      className="w-full h-14 bg-surface-container-lowest border-none rounded-xl px-6 pr-14 focus:ring-2 focus:ring-primary shadow-inner" 
                      placeholder="Ask anything about this book..." 
                      type="text"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 accent-gradient text-white rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow">
                      <span className="material-symbols-outlined">send</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-label-sm text-on-surface-variant/60 self-center mr-2">Try:</span>
                    <button className="px-4 py-2 bg-surface-container-high/50 rounded-full text-label-sm hover:bg-primary/10 hover:text-primary transition-colors">Summary of Chapter 4</button>
                    <button className="px-4 py-2 bg-surface-container-high/50 rounded-full text-label-sm hover:bg-primary/10 hover:text-primary transition-colors">Key ethical arguments</button>
                  </div>
                </div>
              </section>

              {similarBooks.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-headline-md text-headline-md">Similar Works</h3>
                    <button className="text-primary font-bold text-label-md flex items-center gap-1 hover:underline">
                      View All
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </div>
                  <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
                    {similarBooks.map(simBook => (
                      <div key={simBook.id} className="flex-none w-48 group cursor-pointer" onClick={() => navigate(`/book/${simBook.id}`)}>
                        <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-3 shadow-md group-hover:shadow-xl transition-shadow">
                          <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={simBook.cover} alt={simBook.title} />
                          {simBook.matchPercent && (
                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-black text-primary">
                              {simBook.matchPercent}% MATCH
                            </div>
                          )}
                        </div>
                        <p className="font-bold text-on-surface truncate">{simBook.title}</p>
                        <p className="text-label-sm text-on-surface-variant truncate">{simBook.author}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>
          </div>
        </div>
      </main>
      
      <footer className="md:ml-sidebar-width bg-surface border-t border-outline-variant/30 py-8 relative z-10">
        <div className="max-w-[1440px] mx-auto px-container-padding flex flex-col md:flex-row justify-between items-center text-label-sm text-on-surface-variant">
          <div className="mb-4 md:mb-0">
            © 2024 Aethelgard AI. Precision in knowledge.
          </div>
          <div className="flex gap-8">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">API Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BookDetails;
