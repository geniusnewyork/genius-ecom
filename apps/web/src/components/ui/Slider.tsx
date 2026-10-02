import React from 'react';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Slider: React.FC<SliderProps> = ({ label, value, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
          <span className="text-sm text-slate-500">{value}</span>
        </div>
      )}
      <input 
        type="range"
        value={value}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-primary-600"
        {...props}
      />
    </div>
  );
};
