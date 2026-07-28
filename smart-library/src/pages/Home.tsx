import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { RECOMMENDED_BOOKS, CONTINUE_READING_BOOKS } from '../utils/placeholderData';

const NEW_ARRIVALS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBmw-UuzwS556E1pZypgWWugZr37Ka5HXUV9sOtuW4MMsb96CNxEZnjMm7Ykz3t0Ksssqjamr2kab9bWT65DqA2NaIAh4NJsPv6ri1S0NM_ugNCtATwUI_W2QWBTN0G-wvb_up3N-3ymwGqjnBPRxKdrjVJ6fQ4CjCrFX7dFaTwBu7Vlu9worzuP9tKEzeNh0BXFjM9Dxk2LWpCaZKxkDNOYYfGYdfuBK5QgTbeDIsJu9y6BbTu6zE',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAS2YE9dXsDJC9LTiXhunCAzimegBPKgWgNPgcoXny8IMuoVPkk-_mAVxMoAOW_YWYlRdZ8LPI_dy6OLHtN76T1n33KTr-OA6zKjPgwDOMVLZI5Q7ksGBYGgyYBuX0HKpkypR13vVOylNxFOf15mpJsX8WmvE146qqxVX43PyZf8dKwTEmL5XB04ktRYZgnk_Fs0thm0uOVcBKbJcMhEThgtXcnCOsnypv4yJszWCcVTcijCdfBh70',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuClXoI6yyxYiL6ajzXvwxgxJ3s6Wc_fLSaQPUDhmXxBAAOimoYJiJRegBK8pERHu6dTS_BohSfCJxBGn8Kbdv-2YEcNC4KLk02uKyVA74p1VcUjOZcndbF5BNjz9stoWj9LkRWNfLvQnRwn18te5n9P0gNJdPyHY6igtNE7ChGbAx7WrFbHHBfpkFnFE5C-aa3ar9LtWq56JP0krVL_Xleoi5RrbVAOL7L7hc8z0neF4cEbwgT0sfI',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBXaQGXB_gmydpTH5PnhfaHzZ9eVflwGgYx2OZsTeoY4rfRLWmpltEhxmSDRane_rsWwnUT3itSsRQPMePHRMobsk4Ul5qJH_2StFX7Hwm2GDqvdb0L_47bTTQZRw6TwkHFXC9W9PiI9NpDTtUiCNC6p9OX8HvSD8X6urbkUjkJmUJ-2QzAMlp5I7Olfs0CmNvbuyCy_UsV1LGG7Uwobl7pn_WDBvXcPTigt-H4MCxaYeyMBNofcdk',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBCqkXBiug2WSu8vStEYvZ6OWBLmEDs6ZPdC4V3GO3nTrFyMJHDQ3DuD48RGi3BfNBzzlAKFCytb3SBMKqDs7T7hhPs_9hkh42MMPI2KGl6YhoQhTYgy5qPxk-IcYM0w7ldgbrrnWEbnRKH5A43gEUXYANbmzhFBrXqRo8tcrchFplu0ze9mFnovze7F6kFF2mqostFQovQbngoCXTR_C8_qa5ZIr-2CPDY_dCtuzSj8jjl4-jK7oo',
];

const RECENT_ACTIVITY = [
  { icon: 'visibility', label: 'Viewed', title: 'Clean Code', time: '2 hours ago' },
  { icon: 'favorite',   label: 'Added',  title: 'Atomic Habits', time: 'Yesterday, 4:12 PM', suffix: ' to Favorites' },
  { icon: 'star',       label: 'Rated',  title: 'Java Complete Reference', time: 'Oct 24, 2024' },
  { icon: 'auto_awesome', label: 'Asked AI about', title: 'Python concurrency', time: 'Oct 22, 2024' },
];

const KPI = [
  { label: 'Books Read',   value: '12' },
  { label: 'Favorites',    value: '45' },
  { label: 'Streak',       value: '7 Days' },
  { label: 'Hours Read',   value: '124' },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [askQuery, setAskQuery] = useState('');

  const handleAskAI = () => {
    if (askQuery.trim()) {
      navigate('/chat', { state: { initialQuery: askQuery } });
    } else {
      navigate('/chat');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    navigate('/chat', { state: { initialQuery: suggestion } });
  };

  return (
    <div className="flex h-screen w-full relative z-10 overflow-hidden bg-background">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        <Navbar />

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto scroll-hide p-10 space-y-16 pb-20">

          {/* ── Welcome & Stats ── */}
          <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left: Welcome */}
              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-[32px] font-semibold leading-[1.2] tracking-[-0.01em] text-primary">
                    Good Morning, Fazil 👋
                  </h2>
                  <p className="text-[18px] text-on-surface-variant">Ready to discover your next favorite book?</p>
                </div>
                {/* KPI Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {KPI.map(({ label, value }) => (
                    <div key={label} className="glass-card p-4 rounded-xl text-center">
                      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant opacity-60 font-bold">{label}</p>
                      <p className="text-2xl font-bold text-primary">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Daily Goal */}
              <div className="w-full lg:w-72 glass-card p-6 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full -rotate-90">
                    <circle className="text-surface-container-highest" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8" />
                    <circle className="text-primary" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="200.4" strokeWidth="8" style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl font-bold text-primary">45%</span>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-on-surface">Today's Goal</h4>
                <p className="text-xs text-on-surface-variant opacity-70">Keep Reading!</p>
              </div>
            </div>
          </section>

          {/* ── AI Quick Ask ── */}
          <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card p-8 rounded-[24px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-primary/10 transition-colors" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg accent-gradient flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[18px]">neurology</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-primary">Ask Smart Library AI</h3>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="What should I read today?"
                      value={askQuery}
                      onChange={e => setAskQuery(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAskAI()}
                      className="w-full p-4 pr-12 bg-white/50 border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-base outline-none"
                    />
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary">auto_awesome</span>
                  </div>
                  <button 
                    onClick={handleAskAI}
                    className="px-8 py-4 accent-gradient text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-95 transition-all"
                  >
                    <span>Ask AI</span>
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-on-surface-variant mr-2 py-1">Suggestions:</span>
                  {['Recommend Java books', 'Suggest AI books', 'Books similar to Clean Code'].map(s => (
                    <button 
                      key={s} 
                      onClick={() => handleSuggestionClick(s)}
                      className="px-4 py-1.5 rounded-full bg-primary/5 text-primary border border-primary/10 text-xs hover:bg-primary/10 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Recommended For You ── */}
          <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-on-surface flex items-center gap-2">
                <span className="text-2xl">🤖</span> Recommended For You
              </h3>
              <Link to="/recommendations" className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                View All <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </Link>
            </div>
            <div className="flex gap-6 overflow-x-auto scroll-hide pb-6 -mx-4 px-4">
              {RECOMMENDED_BOOKS.map(book => (
                <div key={book.id} className="min-w-[280px] w-[280px] group cursor-pointer">
                  <div className="relative rounded-2xl overflow-hidden aspect-[2/3] shadow-lg mb-4">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url('${book.cover}')` }}
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full shadow-lg">
                      {book.matchPercent}% Match
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-full py-2 bg-white text-primary rounded-lg font-bold text-xs mb-2">View Details</button>
                      <button className="w-full py-2 border border-white/40 text-white rounded-lg font-bold text-xs hover:bg-white/10">Ask AI</button>
                    </div>
                  </div>
                  <h4 className="text-base font-semibold text-on-surface truncate">{book.title}</h4>
                  <p className="text-xs text-on-surface-variant opacity-70">{book.author}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-amber-500">
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="text-xs font-bold ml-1">{book.rating}</span>
                    </div>
                    <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded uppercase font-bold">{book.category}</span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-2 leading-relaxed italic">"{book.matchReason}"</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Continue Reading + Activity ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Continue Reading */}
            <div className="lg:col-span-2 space-y-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-2xl font-semibold text-on-surface">Continue Reading</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CONTINUE_READING_BOOKS.map(book => (
                  <div key={book.id} className="glass-card p-6 rounded-2xl flex gap-4">
                    <div
                      className="w-24 h-32 rounded-lg bg-cover bg-center shrink-0 shadow-sm"
                      style={{ backgroundImage: `url('${book.cover}')` }}
                    />
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h4 className="font-bold text-on-surface leading-tight">{book.title}</h4>
                        <p className="text-xs text-on-surface-variant">{book.author}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span>Progress</span>
                          <span className="text-primary">{book.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${book.progress}%` }} />
                        </div>
                        <button className="w-full mt-2 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-xs font-bold transition-colors">
                          Resume
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* New Arrivals */}
              <div className="pt-4">
                <h3 className="text-2xl font-semibold text-on-surface mb-6">New Arrivals</h3>
                <div className="flex gap-4 overflow-x-auto scroll-hide pb-4">
                  {NEW_ARRIVALS.map((src, i) => (
                    <div key={i} className="min-w-[120px] aspect-[2/3] rounded-xl bg-surface-container-highest shadow-sm hover:scale-105 transition-transform cursor-pointer overflow-hidden border border-white/20">
                      <img src={src} alt="New arrival" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-6 rounded-2xl animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <h3 className="text-2xl font-semibold text-on-surface mb-6">Recent Activity</h3>
              <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-px before:bg-outline-variant/30">
                {RECENT_ACTIVITY.map(({ icon, label, title, time, suffix }, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 z-10 bg-white">
                      <span className="material-symbols-outlined text-primary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {icon}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-on-surface font-medium">
                        {label} <span className="font-bold text-primary cursor-pointer">{title}</span>{suffix}
                      </p>
                      <p className="text-[11px] text-on-surface-variant">{time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 text-on-surface-variant hover:text-primary font-bold text-xs border border-outline-variant/30 rounded-xl transition-all">
                View All Activity
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-surface border-t border-outline-variant/30 py-8 px-10 flex flex-col md:flex-row justify-between items-center shrink-0">
          <p className="text-xs text-on-surface-variant">© 2026 Aethelgard AI. Precision in knowledge.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'API Documentation'].map(l => (
              <a key={l} href="#" className="text-on-surface-variant text-xs hover:text-primary transition-colors">{l}</a>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
