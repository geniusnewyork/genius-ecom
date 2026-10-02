import { create } from 'zustand';
import type { AIProvider } from '../types';

interface AIState {
  provider: AIProvider | null;
  apiKey: string;
  configured: boolean;
  setProvider: (provider: AIProvider | null) => void;
  setApiKey: (key: string) => void;
  clearConfig: () => void;
}

export const useAIStore = create<AIState>((set) => ({
  provider: null,
  apiKey: '',
  configured: false,
  setProvider: (provider) => set({ provider, configured: !!provider && !!useAIStore.getState().apiKey }),
  setApiKey: (apiKey) => set({ apiKey, configured: !!apiKey && !!useAIStore.getState().provider }),
  clearConfig: () => set({ provider: null, apiKey: '', configured: false }),
}));
