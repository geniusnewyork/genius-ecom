import React from 'react';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'options'> {
  label?: string;
  error?: string;
  options?: SelectOption[];
  children?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', label, error, options, children, id, ...props }, ref) => {
    const selectId = id || React.useId();
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={`
            block w-full rounded-lg border px-3 py-2 text-slate-900 dark:text-white bg-white dark:bg-slate-900
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-800 transition-colors
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 dark:border-slate-700'}
            ${className}
          `}
          {...props}
        >
          {options ? (
            options.map((option) => (
              <option key={String(option.value)} value={option.value}>
                {option.label}
              </option>
            ))
          ) : (
            children
          )}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';
export default Select;
