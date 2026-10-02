import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={checked} 
          onChange={(e) => onChange(e.target.checked)} 
        />
        <div className={`block w-10 h-6 rounded-full transition-colors ${checked ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`}></div>
      </div>
      {label && <div className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300">{label}</div>}
    </label>
  );
};
