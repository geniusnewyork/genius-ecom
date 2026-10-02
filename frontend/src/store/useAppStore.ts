import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme, RecentTool } from '../types';

interface AppState {
  theme: Theme;
  favorites: string[];
  recentTools: RecentTool[];
  searchQuery: string;
  sidebarOpen: boolean;
  toggleTheme: (theme: Theme) => void;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  addRecentTool: (id: string) => void;
  setSearchQuery: (query: string) => void;
  toggleSidebar: () => void;
  clearAllData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'system',
      favorites: [],
      recentTools: [],
      searchQuery: '',
      sidebarOpen: false,
      toggleTheme: (theme) => set({ theme }),
      addFavorite: (id) => set((state) => ({ 
        favorites: [...new Set([...state.favorites, id])] 
      })),
      removeFavorite: (id) => set((state) => ({ 
        favorites: state.favorites.filter(favId => favId !== id) 
      })),
      addRecentTool: (id) => set((state) => {
        const filtered = state.recentTools.filter(t => t.id !== id);
        return {
          recentTools: [{ id, timestamp: Date.now() }, ...filtered].slice(0, 10)
        };
      }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      clearAllData: () => set({ favorites: [], recentTools: [] }),
    }),
    {
      name: 'monty-genius-app-storage',
      partialize: (state) => ({ 
        theme: state.theme, 
        favorites: state.favorites,
        recentTools: state.recentTools
      }),
    }
  )
);
