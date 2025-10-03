
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useAppContext } from '../hooks/useAppContext';
import Icon from '../components/Icon';
import { useLocale } from '../contexts/LocaleContext';

const StatCard: React.FC<{ title: string; value: string | number; icon: string }> = ({ title, value, icon }) => (
  <div className="bg-theme-bg-secondary p-6 rounded-lg flex items-center gap-4">
    <div className="bg-theme-accent/20 p-4 rounded-full">
        <Icon name={icon} className="w-8 h-8 text-theme-accent" />
    </div>
    <div>
      <p className="text-sm text-theme-text-secondary">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

const StatsPage: React.FC = () => {
  const { stats } = useAppContext();
  const { t } = useLocale();
  
  const componentUsageData = Object.entries(stats.componentsUsed)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const totalComponents = componentUsageData.reduce((sum, item) => sum + item.count, 0);

  const MOCK_TIME_DATA = [
      { name: 'Mon', created: 4 },
      { name: 'Tue', created: 3 },
      { name: 'Wed', created: 5 },
      { name: 'Thu', created: 2 },
      { name: 'Fri', created: 7 },
      { name: 'Sat', created: 6 },
      { name: 'Sun', created: 8 },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{t('nav.stats')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Prototypes Created" value={stats.prototypesCreated} icon="layout" />
        <StatCard title="Total Components Used" value={totalComponents} icon="grid" />
        <StatCard title="Most Used Component" value={componentUsageData[0]?.name || 'N/A'} icon="sparkles" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-theme-bg-secondary p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Component Usage</h2>
          {componentUsageData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={componentUsageData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-border)" />
                <XAxis type="number" stroke="var(--theme-text-secondary)" />
                <YAxis type="category" dataKey="name" stroke="var(--theme-text-secondary)" width={80} />
                <Tooltip cursor={{fill: 'var(--theme-border)'}} contentStyle={{ backgroundColor: 'var(--theme-bg)', border: '1px solid var(--theme-border)' }}/>
                <Bar dataKey="count" fill="var(--theme-accent)" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-theme-text-secondary text-center py-12">No component data yet. Start creating wireframes!</p>
          )}
        </div>
        
        <div className="bg-theme-bg-secondary p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Activity This Week (Mock)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={MOCK_TIME_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-border)" />
              <XAxis dataKey="name" stroke="var(--theme-text-secondary)" />
              <YAxis stroke="var(--theme-text-secondary)"/>
              <Tooltip cursor={{fill: 'var(--theme-border)'}} contentStyle={{ backgroundColor: 'var(--theme-bg)', border: '1px solid var(--theme-border)' }}/>
              <Bar dataKey="created" fill="var(--theme-accent)" name="Prototypes"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
