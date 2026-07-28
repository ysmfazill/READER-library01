import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INTERESTS } from '../utils/placeholderData';
import type { Interest } from '../types';

const MIN_INTERESTS = 3;
const MAX_INTERESTS = 10;

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggle = (interest: Interest) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(interest.id)) {
        next.delete(interest.id);
      } else if (next.size < MAX_INTERESTS) {
        next.add(interest.id);
      }
      return next;
    });
  };

  const canContinue = selected.size >= MIN_INTERESTS;

  return (
    <div
      className="flex items-center justify-center p-4 md:p-8 min-h-screen"
      style={{
        background:
          'radial-gradient(circle at top right, #ebddff 0%, #f7f9fb 40%), radial-gradient(circle at bottom left, #d8e2ff 0%, #f7f9fb 40%)',
      }}
    >
      {/* Background decorations */}
      <div className="fixed top-0 right-0 -z-10 w-1/2 h-1/2 bg-gradient-to-br from-primary/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-gradient-to-tr from-secondary/10 to-transparent blur-[120px] pointer-events-none" />

      <main className="w-full max-w-5xl glass-card rounded-[32px] overflow-hidden shadow-[0_24px_48px_-12px_rgba(0,0,0,0.1)] relative">
        {/* Progress bar */}
        <div className="px-8 pt-8 pb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-on-surface-variant">Step 1 of 2</span>
            <span className="text-xs font-bold text-primary">Personalization</span>
          </div>
          <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
            <div
              className="h-full accent-gradient transition-all duration-800 ease-out"
              style={{ width: `${Math.max(10, (selected.size / MAX_INTERESTS) * 100)}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col h-full">
          <div className="flex-1 p-8 md:p-12 flex flex-col max-h-[870px]">
            {/* Header */}
            <header className="relative mb-10">
              <div className="relative z-10">
                <h1 className="text-[32px] font-semibold leading-[1.2] tracking-[-0.01em] text-on-surface mb-3 flex items-center gap-2">
                  👋 Welcome to Smart Library
                </h1>
                <p className="text-base text-on-surface-variant max-w-xl">
                  Let's personalize your reading experience. Select the topics you're interested in so our AI can recommend books you'll love.
                </p>
              </div>
            </header>

            {/* Interest grid */}
            <div className="flex-1 overflow-y-auto pr-4 mb-8 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {INTERESTS.map(cat => {
                  const isSelected = selected.has(cat.id);
                  const isDisabled = !isSelected && selected.size >= MAX_INTERESTS;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => !isDisabled && toggle(cat)}
                      className={`interest-card glass-card rounded-2xl p-4 border border-white/40 flex flex-col gap-2 relative group ${isSelected ? 'selected' : ''
                        } ${isDisabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="p-2 rounded-xl bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
                          <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center transition-all duration-300 ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                            }`}
                        >
                          <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                        </div>
                      </div>
                      <h3 className="text-sm font-medium text-on-surface mt-1">{cat.name}</h3>
                      <p className="text-[11px] leading-tight text-on-surface-variant opacity-70">{cat.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer actions */}
            <div className="pt-6 border-t border-outline-variant/30">
              <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  auto_awesome
                </span>
                <p className="text-sm font-medium text-on-surface-variant">
                  <span className="font-bold text-primary">AI Tip:</span> The more interests you select, the better your recommendations become.
                  {' '}({selected.size}/{MAX_INTERESTS} selected)
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs font-semibold text-outline order-2 sm:order-1">
                  You can change your interests anytime from your Profile.
                </p>
                <div className="flex items-center gap-4 w-full sm:w-auto order-1 sm:order-2">
                  <button
                    onClick={() => navigate('/home')}
                    className="px-6 py-3 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
                  >
                    Skip for Now
                  </button>
                  <button
                    onClick={() => canContinue && navigate('/home')}
                    disabled={!canContinue}
                    className={`px-8 py-3 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 transition-all ${canContinue
                      ? 'accent-gradient shadow-primary/20 hover:scale-105 active:scale-95 cursor-pointer'
                      : 'bg-outline/30 cursor-not-allowed shadow-none'
                      }`}
                  >
                    Continue
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
