import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Badge } from '../components/ui';
import { getToolsByCategory } from '../data/tools';
import type { ToolCategory } from '../types';

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const categoryTitles: Record<string, string> = {
    'calculators': 'E-commerce Calculators',
    'pdf': 'PDF Tools',
    'image': 'Image Tools',
    'seller': 'Seller Tools',
    'ai': 'AI Tools',
    'csv': 'CSV Editor'
  };

  const title = categoryTitles[categoryId || ''] || 'Category';
  const tools = getToolsByCategory((categoryId as ToolCategory) || 'calculators');

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{title}</h1>
        <p className="text-slate-600 dark:text-slate-400">Tools specifically designed for {title.toLowerCase()}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(tool => (
          <Link key={tool.id} to={tool.path}>
            <Card clickable className="h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-xl">
                  <div className="font-bold">{tool.name.charAt(0)}</div>
                </div>
                {tool.isNew && <Badge variant="success">New</Badge>}
              </div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">{tool.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm flex-1">{tool.description}</p>
            </Card>
          </Link>
        ))}
      </div>
      
      {tools.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">Coming Soon</h3>
          <p className="text-slate-500 dark:text-slate-400">We are adding new tools to this category soon.</p>
        </div>
      )}
    </div>
  );
};
