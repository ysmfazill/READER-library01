import React from 'react';

const Navbar: React.FC = () => {
  return (
    <header className="h-20 flex items-center justify-between px-10 bg-surface/80 backdrop-blur-md border-b border-white/20 z-20 sticky top-0 shrink-0">
      {/* Search */}
      <div className="flex items-center gap-4 w-full max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-50">
            search
          </span>
          <input
            type="text"
            placeholder="Search across your digital library..."
            className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-base outline-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button aria-label="Notifications" className="p-2 text-on-surface-variant hover:bg-primary/5 rounded-full transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
        </button>
        <button aria-label="Toggle Dark Mode" className="p-2 text-on-surface-variant hover:bg-primary/5 rounded-full transition-colors">
          <span className="material-symbols-outlined">dark_mode</span>
        </button>
        <div className="h-8 w-px bg-outline-variant/30"></div>
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-on-surface">Fazil</p>
            <p className="text-[11px] text-on-surface-variant opacity-70">Gold Librarian</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-highest border-2 border-primary/20 p-0.5 overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCb8vP64kS4H6UOFW_mq9in1nf7QQ3So3WTlkqRjR0-5O0Lez3BjiNogfpG-8d764FEEyI6Rme3tHVV6Mk-T728qxT5_gs0ytSFyARNpTRxfHgRDocuGy6YduOXB4pl_PRybYke5cUJPE8OVzRWMxOY92mubH5bmfHy55SAGvkB4xTEug-YdpEjilvApuJwogioCVaVX9u3t1_QnyXgup75dkqnZk6mVeKkXYOtDlBmyLhLbFmmUPg"
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
