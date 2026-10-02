import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X, Calculator, FileText, Minimize, ShoppingBag, Wand2, Table, 
  CheckCircle2, LayoutGrid, Info
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const categories = [
  { name: 'All Tools', icon: <LayoutGrid className="w-4 h-4" />, path: '/all-tools' },
  { name: 'Calculators', icon: <Calculator className="w-4 h-4" />, path: '/category/calculators' },
  { name: 'PDF Tools', icon: <FileText className="w-4 h-4" />, path: '/category/pdf' },
  { name: 'Image Tools', icon: <Minimize className="w-4 h-4" />, path: '/category/image' },
  { name: 'Seller Tools', icon: <ShoppingBag className="w-4 h-4" />, path: '/category/seller' },
  { name: 'AI Tools', icon: <Wand2 className="w-4 h-4" />, path: '/category/ai' },
  { name: 'CSV Tools', icon: <Table className="w-4 h-4" />, path: '/category/csv' }
];

export const Sidebar: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppStore();
  const location = useLocation();

  return (
    <>
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}
      
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 shadow-xl lg:shadow-none transform transition-transform duration-300 ease-in-out border-r border-slate-200 dark:border-slate-800
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:static lg:w-60'}
        hidden lg:block lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]
        ${sidebarOpen ? '!block' : ''}
      `}>
        <div className="flex items-center justify-between h-16 px-4 lg:hidden border-b border-slate-200 dark:border-slate-800">
          <span className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-500">
            Navigation Menu
          </span>
          <button onClick={toggleSidebar} className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto h-full pb-20 space-y-6">
          <div>
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">
              Tool Suites
            </h3>
            <nav className="space-y-1">
              {categories.map((cat) => {
                const isActive = location.pathname === cat.path;
                return (
                  <Link
                    key={cat.path}
                    to={cat.path}
                    onClick={() => { if(window.innerWidth < 1024) toggleSidebar(); }}
                    className={`flex items-center px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400 font-bold'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="mr-2.5 text-slate-400 dark:text-slate-500">{cat.icon}</span>
                    {cat.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">
              Developer & Quality
            </h3>
            <nav className="space-y-1">
              <Link
                to="/dev/test-suite"
                onClick={() => { if(window.innerWidth < 1024) toggleSidebar(); }}
                className={`flex items-center px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  location.pathname.includes('test')
                    ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400 font-bold'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60'
                }`}
              >
                <span className="mr-2.5 text-emerald-500"><CheckCircle2 className="w-4 h-4" /></span>
                Self-Test Suite
              </Link>
              <Link
                to="/about"
                onClick={() => { if(window.innerWidth < 1024) toggleSidebar(); }}
                className="flex items-center px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60"
              >
                <span className="mr-2.5 text-slate-400"><Info className="w-4 h-4" /></span>
                About Monty Genius
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
