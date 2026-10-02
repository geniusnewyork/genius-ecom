import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-400 mb-4 inline-block">
              MONTY GENIUS
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mb-4">
              A comprehensive suite of free, professional tools designed specifically for e-commerce sellers to optimize their online business.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link to="/category/calculators" className="hover:text-primary-600 dark:hover:text-primary-400">Calculators</Link></li>
              <li><Link to="/category/pdf" className="hover:text-primary-600 dark:hover:text-primary-400">PDF Tools</Link></li>
              <li><Link to="/category/image" className="hover:text-primary-600 dark:hover:text-primary-400">Image Tools</Link></li>
              <li><Link to="/category/seller" className="hover:text-primary-600 dark:hover:text-primary-400">Seller Tools</Link></li>
              <li><Link to="/category/ai" className="hover:text-primary-600 dark:hover:text-primary-400">AI Tools</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link to="/about" className="hover:text-primary-600 dark:hover:text-primary-400">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary-600 dark:hover:text-primary-400">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-600 dark:hover:text-primary-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary-600 dark:hover:text-primary-400">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-center flex flex-col items-center justify-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            Designed with ❤️ by Mr. Monty Genius
          </p>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Monty Genius Ecom Tools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
