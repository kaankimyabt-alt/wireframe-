import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import Icon from '../components/Icon';
import { useWireframeGenerator } from '../hooks/useWireframeGenerator';
import { useLocale } from '../contexts/LocaleContext';

const suggestionPrompts = {
    gamify: "A user profile screen for a mobile app, featuring a prominent progress bar for experience points at the top. Below, a grid of earned badges is displayed. A section for 'Daily Challenges' with checklist items is at the bottom.",
    social: "A modal dialog for sharing a design. It has a title 'Share your creation'. Below are large icon buttons for 'Twitter', 'Facebook', and 'Instagram'. There's also an input field with a shareable link and a 'Copy Link' button next to it.",
    analytics: "A web dashboard for user analytics. It includes a large bar chart titled 'Weekly Activity'. Next to it, there's a pie chart for 'Component Usage'. A table at the bottom lists 'Recent Projects' with names and dates.",
    customize: "A settings page for an application. It has a section for 'Theme Selection' with several color swatch options. Another section allows adjusting 'Font Size' with a slider. It also includes several toggle switches for features like 'Dark Mode' and 'Email Notifications'."
};

const appExamples = [
    { id: 'figma', name: 'Figma', imageUrl: 'https://picsum.photos/seed/figma/400/300' },
    { id: 'balsamiq', name: 'Balsamiq', imageUrl: 'https://picsum.photos/seed/balsamiq/400/300' },
    { id: 'sketch', name: 'Sketch', imageUrl: 'https://picsum.photos/seed/sketch/400/300' },
    { id: 'invision', name: 'InVision', imageUrl: 'https://picsum.photos/seed/invision/400/300' },
];

const SuggestionCard: React.FC<{ title: string; description: string; icon: string; onClick: () => void; }> = ({ title, description, icon, onClick }) => (
    <button onClick={onClick} className="bg-theme-bg-secondary p-6 rounded-lg flex items-start gap-4 text-left w-full hover:ring-2 hover:ring-theme-accent transition-all duration-200">
        <div className="bg-theme-accent/20 p-3 rounded-full flex-shrink-0">
            <Icon name={icon} className="w-6 h-6 text-theme-accent" />
        </div>
        <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-theme-text-secondary text-sm mt-1">{description}</p>
        </div>
    </button>
);

const AppExampleCard: React.FC<{ id: string; name: string; imageUrl: string }> = ({ id, name, imageUrl }) => (
     <Link to={`/suggestions/${id}`} className="block bg-theme-bg-secondary rounded-lg overflow-hidden group">
        <img src={imageUrl} alt={name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"/>
        <div className="p-4">
            <h3 className="font-semibold">{name}</h3>
        </div>
    </Link>
);

const SuggestionsPage: React.FC = () => {
  const { prompt } = useAppContext();
  const handleGenerate = useWireframeGenerator();
  const { t } = useLocale();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t('suggestions.title')}</h1>
        <p className="text-theme-text-secondary mt-1">
          {t('suggestions.based_on')}: <span className="text-theme-text italic">"{prompt || t('wireframe.last_prompt')}"</span>
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t('suggestions.ideas_title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SuggestionCard icon="lightbulb" title={t('suggestions.idea.gamify.title')} description={t('suggestions.idea.gamify.description')} onClick={() => handleGenerate(suggestionPrompts.gamify)} />
            <SuggestionCard icon="user" title={t('suggestions.idea.social.title')} description={t('suggestions.idea.social.description')} onClick={() => handleGenerate(suggestionPrompts.social)} />
            <SuggestionCard icon="chart" title={t('suggestions.idea.analytics.title')} description={t('suggestions.idea.analytics.description')} onClick={() => handleGenerate(suggestionPrompts.analytics)} />
            <SuggestionCard icon="settings" title={t('suggestions.idea.customize.title')} description={t('suggestions.idea.customize.description')} onClick={() => handleGenerate(suggestionPrompts.customize)} />
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">{t('suggestions.examples_title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {appExamples.map(app => (
                <AppExampleCard key={app.id} id={app.id} name={app.name} imageUrl={app.imageUrl} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default SuggestionsPage;