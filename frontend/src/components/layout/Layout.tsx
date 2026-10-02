import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { SearchModal } from './SearchModal';
import { useKeyboard } from '../../hooks/useKeyboard';
import { ToastProvider } from '../ui/Toast';

export const Layout: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  useKeyboard('k', (e) => {
    e.preventDefault();
    setSearchOpen(true);
  }, true);

  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Header onSearchOpen={() => setSearchOpen(true)} />
        <div className="flex-1 flex max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <Sidebar />
          <main className="flex-1 py-8 md:pl-8 overflow-x-hidden min-h-[calc(100vh-4rem-200px)]">
            <Outlet />
          </main>
        </div>
        <Footer />
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </ToastProvider>
  );
};
