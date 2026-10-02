import React from 'react';
import { Heart } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface ToolHeaderProps {
  id?: string;
  title: string;
  description: string;
}

export const ToolHeader: React.FC<ToolHeaderProps> = ({ id, title, description }) => {
  const { favorites, addFavorite, removeFavorite } = useAppStore();
  const isFavorite = favorites.includes(id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  return (
    <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-6 flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{title}</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl">{description}</p>
      </div>
      <button 
        onClick={toggleFavorite}
        className={`p-2 rounded-full border transition-colors ${
          isFavorite 
            ? 'bg-red-50 border-red-200 text-red-500 dark:bg-red-900/20 dark:border-red-800' 
            : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800'
        }`}
      >
        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
      </button>
    </div>
  );
};

export default ToolHeader;
