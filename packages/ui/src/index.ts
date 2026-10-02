import { BRAND } from '@monty-genius/config';
import type { PlanId } from '@monty-genius/shared-types';

export { BRAND };

export const THEME = {
  colors: {
    primary: '#06b6d4', // cyan-500
    primaryHover: '#0891b2',
    accent: '#3b82f6', // blue-500
    darkBg: '#0b1329',
    darkCard: '#131d36',
    darkBorder: '#1e293b',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
};

export function getPlanBadgeClass(planId: PlanId): string {
  switch (planId) {
    case 'FREE':
      return 'bg-slate-700 text-slate-200 border-slate-600';
    case 'PRO':
      return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    case 'BUSINESS':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'LIFETIME':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    default:
      return 'bg-slate-800 text-slate-300 border-slate-700';
  }
}
