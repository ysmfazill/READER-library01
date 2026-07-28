import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { FavoritesProvider }      from '../context/FavoritesContext';
import { ReadingHistoryProvider } from '../context/ReadingHistoryContext';
import { UserProfileProvider, useUserProfile }    from '../context/UserProfileContext';

// Lazy loaded pages
const Splash            = React.lazy(() => import('../pages/Splash'));
const Login             = React.lazy(() => import('../pages/Login'));
const Registration      = React.lazy(() => import('../pages/Registration'));
const Welcome           = React.lazy(() => import('../pages/Welcome'));
const Home              = React.lazy(() => import('../pages/Home'));
const SearchBooks       = React.lazy(() => import('../pages/SearchBooks'));
const BookDetails       = React.lazy(() => import('../pages/BookDetails'));
const Favorites         = React.lazy(() => import('../pages/Favorites'));
const ReadingHistory    = React.lazy(() => import('../pages/ReadingHistory'));
const Profile           = React.lazy(() => import('../pages/Profile'));
const Settings          = React.lazy(() => import('../pages/Settings'));
const Admin             = React.lazy(() => import('../pages/Admin'));
const AIRecommendations = React.lazy(() => import('../pages/AIRecommendations'));
const AIChat            = React.lazy(() => import('../pages/AIChat'));

// Simple loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-surface">
    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
  </div>
);

const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile } = useUserProfile();
  if (profile.role !== 'ADMIN') {
    return <Navigate to="/home" replace />;
  }
  return <>{children}</>;
};

const AppRouter: React.FC = () => {
  return (
    <Router>
      <UserProfileProvider>
        <FavoritesProvider>
          <ReadingHistoryProvider>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Auth Flow */}
                <Route path="/"         element={<Splash />} />
                <Route path="/login"    element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/welcome"  element={<Welcome />} />

                {/* Main App */}
                <Route path="/home"             element={<Home />} />
                <Route path="/search"           element={<SearchBooks />} />
                <Route path="/book/:id"         element={<BookDetails />} />
                <Route path="/favorites"        element={<Favorites />} />
                <Route path="/history"          element={<ReadingHistory />} />
                <Route path="/profile"          element={<Profile />} />
                <Route path="/settings"         element={<Settings />} />
                <Route path="/admin"            element={<AdminProtectedRoute><Admin /></AdminProtectedRoute>} />
                <Route path="/recommendations"  element={<AIRecommendations />} />
                <Route path="/chat"             element={<AIChat />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </ReadingHistoryProvider>
        </FavoritesProvider>
      </UserProfileProvider>
    </Router>
  );
};

export default AppRouter;
