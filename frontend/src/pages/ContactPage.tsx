import React from 'react';

export const ContactPage: React.FC = () => (
  <div className="max-w-2xl mx-auto py-12 animate-fadeIn">
    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Contact Us</h1>
    <p className="text-slate-600 dark:text-slate-300 mb-8">
      We'd love to hear from you. Please send us your feedback, bug reports, or tool requests.
    </p>
    
    <form className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
        <input type="text" className="w-full rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-500" placeholder="Your Name" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
        <input type="email" className="w-full rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-500" placeholder="your@email.com" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
        <textarea rows={5} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-500" placeholder="How can we help?"></textarea>
      </div>
      <button type="button" className="w-full bg-primary-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-primary-700 transition-colors">
        Send Message
      </button>
    </form>
  </div>
);
