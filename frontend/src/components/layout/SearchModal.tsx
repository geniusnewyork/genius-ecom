import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Command, Clock } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { searchTools } from '../../data/tools';
import { useAppStore } from '../../store/useAppStore';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { recentTools, addRecentTool } = useAppStore();

  const results = query ? searchTools(query) : [];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex].id, results[selectedIndex].path);
    }
  };

  const handleSelect = (id: string, path: string) => {
    addRecentTool(id);
    navigate(path);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="flex flex-col h-full max-h-[80vh]">
        <div className="relative flex items-center px-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="absolute left-6 top-1 text-slate-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white outline-none"
            placeholder="Search for tools, calculators..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <button 
            onClick={onClose}
            className="absolute right-6 top-1.5 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-2">
          {query.length > 0 ? (
            results.length > 0 ? (
              <div className="space-y-1">
                {results.map((tool, idx) => (
                  <div
                    key={tool.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                      idx === selectedIndex 
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                    onClick={() => handleSelect(tool.id, tool.path)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <div className="flex-1">
                      <div className="font-medium">{tool.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{tool.description}</div>
                    </div>
                    <Command className="w-4 h-4 opacity-50 ml-3" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-slate-500">
                No tools found for "{query}"
              </div>
            )
          ) : (
            <div>
              {recentTools.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase px-3 mb-2 flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1" /> Recent Tools
                  </h3>
                  {/* Just showing a placeholder text if we don't map actual tools to recent ones here */}
                  <div className="px-3 text-sm text-slate-400">Search to discover tools.</div>
                </div>
              )}
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase px-3 mb-2">Popular Tools</h3>
                <div className="space-y-1">
                  {/* Pre-fill with a few tools if empty */}
                  {searchTools('').slice(0, 5).map((tool) => (
                     <div
                     key={tool.id}
                     className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                     onClick={() => handleSelect(tool.id, tool.path)}
                   >
                     <div className="flex-1">
                       <div className="font-medium text-slate-800 dark:text-slate-200">{tool.name}</div>
                     </div>
                   </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
