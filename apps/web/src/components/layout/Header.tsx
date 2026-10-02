import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Sun, Moon, Menu, X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface HeaderProps {
  onSearchOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchOpen }) => {
  const { theme, toggleTheme, toggleSidebar, sidebarOpen } = useAppStore();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'All Tools', path: '/all-tools' },
    { label: 'Calculators', path: '/category/calculators' },
    { label: 'PDF Tools', path: '/category/pdf' },
    { label: 'Image Tools', path: '/category/image' },
    { label: 'Seller Tools', path: '/category/seller' },
    { label: 'AI Tools', path: '/category/ai' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Extension', path: '/extensions' },
    { label: 'Docs', path: '/docs' },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-200 ${
      scrolled 
        ? 'bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-sm' 
        : 'bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border-b border-slate-100 dark:border-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar} 
              aria-label="Toggle navigation menu"
              className="p-2 mr-2 lg:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 tracking-tight">
                MONTY GENIUS
              </span>
            </Link>
          </div>

          <nav className="hidden xl:flex space-x-5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.label} 
                  to={item.path} 
                  className={`text-xs font-semibold tracking-wide transition-colors ${
                    isActive 
                      ? 'text-cyan-600 dark:text-cyan-400' 
                      : 'text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-3">
            <button 
              onClick={onSearchOpen}
              className="flex items-center px-3 py-1.5 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
              title="Search tools (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 mr-2 text-slate-400" />
              <span className="hidden sm:inline-block mr-2 font-medium">Search tools...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded shadow-2xs">Ctrl+K</kbd>
            </button>

            <button 
              onClick={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle dark/light theme"
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
