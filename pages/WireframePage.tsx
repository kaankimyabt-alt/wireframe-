import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import WireframeRenderer from '../components/WireframeRenderer';
import { useLocale } from '../contexts/LocaleContext';

const WireframePage: React.FC = () => {
  const { wireframe, isLoading, prompt } = useAppContext();
  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">{t('wireframe.title')}</h1>
        <p className="text-theme-text-secondary mt-1">
          {t('wireframe.result_for')}: <span className="text-theme-text italic">"{prompt || t('wireframe.last_prompt')}"</span>
        </p>
      </header>

      {isLoading && (
        <div className="flex flex-col items-center justify-center p-12 bg-theme-bg-secondary rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-accent"></div>
          <p className="mt-4 text-lg">{t('wireframe.loading')}</p>
        </div>
      )}

      {!isLoading && (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow">
                <WireframeRenderer components={wireframe} />
            </div>
            <aside className="lg:w-80 flex-shrink-0 space-y-6">
                <div className="bg-theme-bg-secondary p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">{t('wireframe.suggestions.title')}</h3>
                    <ul className="space-y-3 text-sm text-theme-text-secondary">
                        <li className="p-3 bg-theme-border/50 rounded-md cursor-pointer hover:bg-theme-border">{t('wireframe.suggestions.nav')}</li>
                        <li className="p-3 bg-theme-border/50 rounded-md cursor-pointer hover:bg-theme-border">{t('wireframe.suggestions.search')}</li>
                        <li className="p-3 bg-theme-border/50 rounded-md cursor-pointer hover:bg-theme-border">{t('wireframe.suggestions.columns')}</li>
                        <li className="p-3 bg-theme-border/50 rounded-md cursor-pointer hover:bg-theme-border">{t('wireframe.suggestions.theme')}</li>
                    </ul>
                </div>
            </aside>
        </div>
      )}
    </div>
  );
};

export default WireframePage;
