import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { icon: 'dashboard',         label: 'Dashboard',          to: '/home' },
  { icon: 'star',              label: 'Recommended Books',  to: '/recommendations' },
  { icon: 'search',            label: 'Search Books',       to: '/search' },
  { icon: 'favorite',          label: 'Favorites',          to: '/favorites' },
  { icon: 'collections_bookmark', label: 'Collections',       to: '/collections' },
  { icon: 'history',           label: 'Reading History',    to: '/history' },
  { icon: 'monitoring',        label: 'Analytics',          to: '/analytics' },
  { icon: 'trophy',            label: 'Leaderboard',        to: '/leaderboard' },
];

const ACCOUNT_ITEMS = [
  { icon: 'person',               label: 'Profile',  to: '/profile' },
  { icon: 'settings',             label: 'Settings', to: '/settings' },
];

const ADMIN_ITEM = { icon: 'admin_panel_settings', label: 'Admin Panel', to: '/admin' };

interface SidebarProps {
  onClose?: () => void;
  className?: string;
  isDrawer?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, className = '', isDrawer = false }) => {
  const { isAdmin } = useAuth();

  const accountItems = isAdmin ? [...ACCOUNT_ITEMS, ADMIN_ITEM] : ACCOUNT_ITEMS;

  const baseClasses = isDrawer
    ? 'flex flex-col w-full h-full py-6 gap-y-2'
    : 'hidden lg:flex w-[280px] bg-surface/80 backdrop-blur-xl border-r border-outline-variant/20 flex-col py-6 gap-y-2 shrink-0';

  return (
    <aside className={`${baseClasses} ${className}`}>
      {/* Brand */}
      <div className="px-6 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Readify Logo" className="h-10 w-auto object-contain shrink-0" />
          <div>
            <h1 className="text-xl font-bold text-primary leading-none">Readify</h1>
            <p className="text-[11px] text-on-surface-variant opacity-70">Smart Recommendation System</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-on-surface-variant hover:bg-primary/10 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close navigation menu"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar px-3">
        <div className="space-y-1">
          {NAV_ITEMS.map(({ icon, label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }: { isActive: boolean }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 min-h-[44px] ${
                  isActive
                    ? 'sidebar-active font-semibold'
                    : 'text-on-surface-variant hover:bg-primary/5 hover:text-primary'
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        {/* Account section */}
        <div className="mt-6 pt-6 border-t border-outline-variant/30 px-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-outline mb-3">Account</p>
          <div className="space-y-1">
            {accountItems.map(({ icon, label, to }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }: { isActive: boolean }) =>
                  `flex items-center gap-4 px-2 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                    isActive ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-primary'
                  }`
                }
              >
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Find Books CTA */}
      <div className="px-4 mt-auto pt-4">
        <NavLink
          to="/search"
          onClick={onClose}
          className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-md hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[48px]"
        >
          <span className="material-symbols-outlined">search</span>
          <span>Find Books</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
