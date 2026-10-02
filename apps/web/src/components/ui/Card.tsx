import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  clickable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', padding = 'md', clickable = false, children, ...props }, ref) => {
    
    const variants = {
      default: 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800',
      glass: 'glass',
      elevated: 'bg-white dark:bg-slate-900 shadow-lg border border-slate-100 dark:border-slate-800'
    };

    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-8'
    };

    return (
      <div
        ref={ref}
        className={`
          rounded-xl overflow-hidden transition-all duration-200
          ${variants[variant]}
          ${paddings[padding]}
          ${clickable ? 'cursor-pointer hover:shadow-md hover:-translate-y-1' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div className={`px-5 pt-5 pb-2 ${className}`} {...props}>{children}</div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className = '', children, ...props }) => (
  <h3 className={`text-lg font-semibold text-slate-900 dark:text-white ${className}`} {...props}>{children}</h3>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div className={`px-5 pb-5 ${className}`} {...props}>{children}</div>
);
