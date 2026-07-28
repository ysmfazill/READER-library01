import React from 'react';

interface SearchAISuggestionsProps {
  className?: string;
  onSuggestionClick?: (query: string) => void;
}

export const SearchAISuggestions: React.FC<SearchAISuggestionsProps> = ({ className = '', onSuggestionClick }) => {
  return (
    <div className={`glass-card rounded-2xl p-6 bg-gradient-to-br from-primary/5 to-secondary/5 ${className}`}>
      <h4 className="font-headline-md text-body-lg mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined ai-gradient-text" style={{ fontVariationSettings: "'FILL' 1" }}>
          auto_awesome
        </span>
        Smart Suggestions
      </h4>
      <p className="text-label-md text-on-surface-variant mb-4 opacity-80">
        Based on your recent research sessions.
      </p>
      <ul className="space-y-3">
        <li>
          <button 
            className="w-full text-left p-3 rounded-xl hover:bg-white/80 transition-all flex items-center gap-3 group"
            onClick={() => onSuggestionClick?.('Python for Science')}
          >
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-sm">terminal</span>
            </span>
            <div>
              <p className="text-label-md font-bold">Python for Science</p>
              <p className="text-label-sm text-on-surface-variant opacity-60">12 new matches</p>
            </div>
          </button>
        </li>
        <li>
          <button 
            className="w-full text-left p-3 rounded-xl hover:bg-white/80 transition-all flex items-center gap-3 group"
            onClick={() => onSuggestionClick?.('Neural Networks')}
          >
            <span className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-sm">neurology</span>
            </span>
            <div>
              <p className="text-label-md font-bold">Neural Networks</p>
              <p className="text-label-sm text-on-surface-variant opacity-60">84 related titles</p>
            </div>
          </button>
        </li>
        <li>
          <button 
            className="w-full text-left p-3 rounded-xl hover:bg-white/80 transition-all flex items-center gap-3 group"
            onClick={() => onSuggestionClick?.('Clean Code')}
          >
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-sm">history_edu</span>
            </span>
            <div>
              <p className="text-label-md font-bold">Clean Code</p>
              <p className="text-label-sm text-on-surface-variant opacity-60">Classic recommended</p>
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
};
