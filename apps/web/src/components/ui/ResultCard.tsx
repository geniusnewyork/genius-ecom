import React from 'react';
import { Card } from './Card';

export interface ResultCardProps {
  label?: string;
  title?: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'default' | 'primary' | string;
  subtext?: string;
  className?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ 
  label, 
  title, 
  value, 
  icon, 
  color, 
  variant, 
  subtext,
  className = '' 
}) => {
  const displayLabel = title || label || '';
  
  let variantColor = color || 'text-cyan-600 dark:text-cyan-400';
  if (variant === 'success') variantColor = 'text-emerald-500 dark:text-emerald-400';
  else if (variant === 'danger') variantColor = 'text-rose-500 dark:text-rose-400';
  else if (variant === 'warning') variantColor = 'text-amber-500 dark:text-amber-400';
  else if (variant === 'info') variantColor = 'text-cyan-500 dark:text-cyan-400';

  return (
    <Card padding="md" variant="elevated" className={`flex items-center space-x-4 ${className}`}>
      {icon && (
        <div className={`p-3 rounded-lg bg-opacity-10 bg-current ${variantColor}`}>
          {icon}
        </div>
      )}
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{displayLabel}</p>
        <p className={`text-2xl font-bold ${variantColor}`}>{value}</p>
        {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
      </div>
    </Card>
  );
};

export default ResultCard;
