import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab, onChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    if (onChange) onChange(id);
  };

  return (
    <div className="w-full">
      <div className="flex space-x-1 border-b border-slate-200 dark:border-slate-800 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              flex items-center space-x-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors
              ${activeTab === tab.id 
                ? 'bg-white dark:bg-slate-900 text-primary-600 dark:text-primary-400 border-t border-l border-r border-slate-200 dark:border-slate-800 -mb-[1px]' 
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'}
            `}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="p-4 bg-white dark:bg-slate-900 rounded-b-lg border border-t-0 border-slate-200 dark:border-slate-800">
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
};
