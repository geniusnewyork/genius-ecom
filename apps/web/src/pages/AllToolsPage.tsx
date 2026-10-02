import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star } from 'lucide-react';
import { Card, Input, Badge } from '../components/ui';
import { tools } from '../data/tools';
import type { ToolCategory } from '../types';
import { useAppStore } from '../store/useAppStore';

export const AllToolsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'all'>('all');
  const { favorites, addFavorite, removeFavorite } = useAppStore();

  const categories: { id: ToolCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Tools' },
    { id: 'calculators', label: 'Calculators' },
    { id: 'pdf', label: 'PDF Tools' },
    { id: 'image', label: 'Image Tools' },
    { id: 'seller', label: 'Seller Tools' },
    { id: 'ai', label: 'AI Tools' },
    { id: 'csv', label: 'CSV Editor' }
  ];

  const filteredTools = tools.filter(tool => {
    const q = search.toLowerCase();
    const matchesSearch = tool.name.toLowerCase().includes(q) || 
                          tool.description.toLowerCase().includes(q) ||
                          tool.keywords.some(k => k.toLowerCase().includes(q));
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">All Tools</h1>
        <p className="text-slate-600 dark:text-slate-400">Browse our complete collection of 40+ free tools for e-commerce sellers.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="w-full md:w-96">
          <Input 
            placeholder="Search by name, category, or keyword..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-5 h-5 text-slate-400" />}
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeCategory === cat.id 
                  ? 'bg-cyan-600 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredTools.map(tool => {
            const isFav = favorites.includes(tool.id);
            return (
              <Link key={tool.id} to={tool.path}>
                <Card clickable className="h-full flex flex-col justify-between transition-all hover:shadow-md hover:border-cyan-400 dark:hover:border-cyan-500 border-slate-200 dark:border-slate-800 p-5">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-9 h-9 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 rounded-lg flex items-center justify-center font-bold text-sm">
                        {tool.name.charAt(0)}
                      </div>
                      <div className="flex items-center space-x-1.5">
                        {tool.isNew && <Badge variant="success">New</Badge>}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            isFav ? removeFavorite(tool.id) : addFavorite(tool.id);
                          }}
                          className={`p-1 rounded-full ${isFav ? 'text-amber-500 fill-amber-500' : 'text-slate-400 hover:text-amber-500'}`}
                        >
                          <Star className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>
                    <h3 className="font-semibold text-base text-slate-900 dark:text-white mb-1.5">{tool.name}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{tool.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">{tool.category}</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline">Use Tool →</span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
            <Filter className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">No tools found</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Try adjusting your search query or category filter.</p>
        </div>
      )}
    </div>
  );
};

export default AllToolsPage;
