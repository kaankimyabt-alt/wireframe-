
import React from 'react';
import Icon from '../components/Icon';
import { useLocale } from '../contexts/LocaleContext';

const ComponentCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-theme-bg-secondary rounded-lg p-6">
    <h3 className="text-lg font-semibold text-theme-text mb-4">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const LibraryPage: React.FC = () => {
  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('library.title')}</h1>
      <p className="text-theme-text-secondary">{t('library.description')}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ComponentCard title="Buttons">
          <button className="w-full py-2 px-4 bg-theme-accent text-white font-semibold rounded-lg hover:bg-theme-accent-hover transition-colors">Primary Button</button>
          <button className="w-full py-2 px-4 bg-theme-border text-theme-text font-semibold rounded-lg hover:bg-theme-border/80 transition-colors">Secondary Button</button>
        </ComponentCard>
        
        <ComponentCard title="Inputs & Forms">
            <input type="text" placeholder="Text input" className="w-full p-2 bg-theme-border rounded-md focus:ring-2 focus:ring-theme-accent focus:outline-none" />
            <input type="email" placeholder="Email input" className="w-full p-2 bg-theme-border rounded-md focus:ring-2 focus:ring-theme-accent focus:outline-none" />
            <textarea placeholder="Text area" className="w-full p-2 bg-theme-border rounded-md focus:ring-2 focus:ring-theme-accent focus:outline-none h-24"></textarea>
        </ComponentCard>

        <ComponentCard title="Navigation">
            <div className="flex justify-around bg-theme-border p-2 rounded-lg">
                <div className="flex flex-col items-center text-theme-accent"><Icon name="home" /> <span className="text-xs">Home</span></div>
                <div className="flex flex-col items-center text-theme-text-secondary"><Icon name="grid" /> <span className="text-xs">Browse</span></div>
                <div className="flex flex-col items-center text-theme-text-secondary"><Icon name="user" /> <span className="text-xs">Profile</span></div>
            </div>
        </ComponentCard>

        <ComponentCard title="Icons">
            <div className="flex flex-wrap gap-4 text-theme-text-secondary">
                <Icon name="home" className="w-8 h-8" />
                <Icon name="search" className="w-8 h-8" />
                <Icon name="user" className="w-8 h-8" />
                <Icon name="settings" className="w-8 h-8" />
                <Icon name="menu" className="w-8 h-8" />
                <Icon name="chart" className="w-8 h-8" />
            </div>
        </ComponentCard>

        <ComponentCard title="Cards">
            <div className="bg-theme-border rounded-lg p-4">
                <div className="h-24 bg-theme-bg rounded-md flex items-center justify-center mb-3"><Icon name="image" className="w-10 h-10 text-theme-text-secondary"/></div>
                <div className="h-4 bg-theme-bg w-3/4 rounded-sm mb-2"></div>
                <div className="h-3 bg-theme-bg w-1/2 rounded-sm"></div>
            </div>
        </ComponentCard>

         <ComponentCard title="Menus">
            <div className="relative">
                <button className="w-full flex justify-between items-center py-2 px-4 bg-theme-border text-theme-text font-semibold rounded-lg">
                    <span>Dropdown Menu</span>
                    <span>▼</span>
                </button>
                <div className="absolute w-full mt-1 bg-theme-bg-secondary border border-theme-border rounded-lg shadow-lg">
                    <a href="#" className="block px-4 py-2 text-sm text-theme-text-secondary hover:bg-theme-border">Option 1</a>
                    <a href="#" className="block px-4 py-2 text-sm text-theme-text-secondary hover:bg-theme-border">Option 2</a>
                </div>
            </div>
        </ComponentCard>
      </div>
    </div>
  );
};

export default LibraryPage;
