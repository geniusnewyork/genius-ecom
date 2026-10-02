import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '../components/ui';

export const NotFoundPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center animate-fadeIn min-h-[60vh]">
    <h1 className="text-9xl font-black text-slate-200 dark:text-slate-800 mb-4">404</h1>
    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Page Not Found</h2>
    <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
      Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
    </p>
    <Link to="/">
      <Button leftIcon={<Home className="w-4 h-4" />}>
        Back to Home
      </Button>
    </Link>
  </div>
);
