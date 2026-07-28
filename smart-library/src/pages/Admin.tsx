import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

// ── Dummy Data ────────────────────────────────────────────────
const DUMMY_ANALYTICS = [
  { label: 'Total Users', value: '12,450', icon: 'group', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Active Books', value: '45,211', icon: 'library_books', color: 'text-secondary', bg: 'bg-secondary/10' },
  { label: 'Active Sessions', value: '1,420', icon: 'devices', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { label: 'System Health', value: '99.9%', icon: 'health_and_safety', color: 'text-amber-500', bg: 'bg-amber-50' },
];

const DUMMY_USERS = [
  { id: '1', name: 'Alex Reinholt', email: 'alex.reinholt@example.com', role: 'User', status: 'Active' },
  { id: '2', name: 'Sarah Vance', email: 'sarah.vance@example.com', role: 'Admin', status: 'Active' },
  { id: '3', name: 'John Doe', email: 'john.doe@example.com', role: 'User', status: 'Suspended' },
  { id: '4', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', status: 'Active' },
];

const DUMMY_BOOKS = [
  { id: 'b1', title: 'The Future of AI', author: 'Alan Turing III', category: 'Technology', status: 'Published' },
  { id: 'b2', title: 'Advanced Data Science', author: 'Gene Hacker', category: 'Science', status: 'Draft' },
  { id: 'b3', title: 'Philosophical AI', author: 'S. Schrodinger', category: 'Philosophy', status: 'Published' },
  { id: 'b4', title: 'Web Frameworks 2024', author: 'Ada Lovelace Jr', category: 'Development', status: 'Published' },
];

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'books'>('dashboard');

  return (
    <div className="bg-surface text-on-surface min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      </div>

      <Navbar />
      <Sidebar />

      <main className="md:ml-sidebar-width pt-28 px-container-padding pb-section-gap max-w-[1440px] mx-auto min-h-screen">
        {/* ── Header ── */}
        <section className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-headline-lg text-headline-lg mb-1 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                admin_panel_settings
              </span>
              Admin Dashboard
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Manage users, books, and system settings.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-xl text-label-md font-semibold transition-all ${activeTab === 'dashboard' ? 'ai-gradient-bg text-white' : 'bg-surface-container hover:bg-primary/10'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-xl text-label-md font-semibold transition-all ${activeTab === 'users' ? 'ai-gradient-bg text-white' : 'bg-surface-container hover:bg-primary/10'}`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('books')}
              className={`px-4 py-2 rounded-xl text-label-md font-semibold transition-all ${activeTab === 'books' ? 'ai-gradient-bg text-white' : 'bg-surface-container hover:bg-primary/10'}`}
            >
              Books
            </button>
          </div>
        </section>

        {/* ── Dashboard Tab ── */}
        {activeTab === 'dashboard' && (
          <div className="flex flex-col gap-gutter">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {DUMMY_ANALYTICS.map(({ label, value, icon, color, bg }) => (
                <div key={label} className="glass-card rounded-2xl p-6 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg} ${color}`}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-on-surface">{value}</p>
                    <p className="text-label-sm text-on-surface-variant">{label}</p>
                  </div>
                </div>
              ))}
            </section>
            
            <section className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
                <span className="material-symbols-outlined text-6xl text-primary/30 mb-4">analytics</span>
                <h3 className="font-headline-md text-headline-md mb-2">Analytics Chart Area</h3>
                <p className="text-on-surface-variant max-w-md">
                    Detailed traffic, usage, and revenue metrics would be displayed here using a charting library.
                </p>
            </section>
          </div>
        )}

        {/* ── Users Tab ── */}
        {activeTab === 'users' && (
          <div className="glass-card rounded-2xl p-8 overflow-x-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline-md text-body-lg font-bold">Manage Users</h2>
                <button className="px-4 py-2 ai-gradient-bg text-white rounded-lg flex items-center gap-2 text-sm font-semibold hover:opacity-90">
                    <span className="material-symbols-outlined text-[18px]">add</span> Add User
                </button>
            </div>
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-outline-variant/30 text-label-sm text-on-surface-variant uppercase tracking-wider">
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Role</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {DUMMY_USERS.map((user) => (
                  <tr key={user.id} className="border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors">
                    <td className="p-4 text-body-md font-medium">{user.name}</td>
                    <td className="p-4 text-body-md text-on-surface-variant">{user.email}</td>
                    <td className="p-4 text-body-md">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'Admin' ? 'bg-primary/20 text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                            {user.role}
                        </span>
                    </td>
                    <td className="p-4 text-body-md">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1 ${user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {user.status}
                        </span>
                    </td>
                    <td className="p-4 flex justify-end gap-2">
                      <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Books Tab ── */}
        {activeTab === 'books' && (
          <div className="glass-card rounded-2xl p-8 overflow-x-auto">
             <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline-md text-body-lg font-bold">Manage Books</h2>
                <button className="px-4 py-2 ai-gradient-bg text-white rounded-lg flex items-center gap-2 text-sm font-semibold hover:opacity-90">
                    <span className="material-symbols-outlined text-[18px]">add</span> Add Book
                </button>
            </div>
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-outline-variant/30 text-label-sm text-on-surface-variant uppercase tracking-wider">
                  <th className="p-4 font-semibold">Title</th>
                  <th className="p-4 font-semibold">Author</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {DUMMY_BOOKS.map((book) => (
                  <tr key={book.id} className="border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors">
                    <td className="p-4 text-body-md font-medium">{book.title}</td>
                    <td className="p-4 text-body-md text-on-surface-variant">{book.author}</td>
                    <td className="p-4 text-body-md text-on-surface-variant">{book.category}</td>
                    <td className="p-4 text-body-md">
                         <span className={`px-2 py-1 rounded-full text-xs font-bold ${book.status === 'Published' ? 'bg-secondary/10 text-secondary' : 'bg-amber-100 text-amber-700'}`}>
                            {book.status}
                        </span>
                    </td>
                    <td className="p-4 flex justify-end gap-2">
                      <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
