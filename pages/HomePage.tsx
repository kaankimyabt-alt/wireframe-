
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { getQuickSuggestions } from '../constants';
import { useWireframeGenerator } from '../hooks/useWireframeGenerator';
import { useLocale } from '../contexts/LocaleContext';

const HomePage: React.FC = () => {
  const { prompt, setPrompt } = useAppContext();
  const handleGenerate = useWireframeGenerator();
  const { t } = useLocale();

  const QUICK_SUGGESTIONS = getQuickSuggestions(t);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleGenerate(prompt);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
    handleGenerate(suggestion);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-theme-text mb-2 tracking-tight">
        {t('home.title1')}
      </h1>
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-theme-accent mb-8">
        {t('home.title2')}
      </h2>
      <p className="max-w-2xl text-lg text-theme-text-secondary mb-12">
        {t('home.description')}
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t('home.prompt_placeholder')}
            className="flex-grow p-4 bg-theme-bg-secondary border border-theme-border rounded-lg focus:ring-2 focus:ring-theme-accent focus:outline-none transition"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-theme-accent text-white font-semibold rounded-lg hover:bg-theme-accent-hover transition-colors duration-300 shadow-lg"
          >
            {t('home.generate_button')}
          </button>
        </div>
      </form>
      
      <div className="mt-12 w-full max-w-3xl">
          <h3 className="text-sm font-semibold text-theme-text-secondary uppercase tracking-wider mb-4">{t('home.suggestions_title')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {QUICK_SUGGESTIONS.map(suggestion => (
                  <button 
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-3 bg-theme-bg-secondary border border-theme-border rounded-md text-left text-sm text-theme-text-secondary hover:border-theme-accent hover:text-theme-text transition"
                  >
                      {suggestion}
                  </button>
              ))}
          </div>
      </div>
    </div>
  );
};

export default HomePage;
