import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Theme, Language } from '../types';
import { useLocale } from '../contexts/LocaleContext';

const THEMES = [
  { id: Theme.DarkPurple, name: 'Dark Purple', color: 'bg-indigo-800' },
  { id: Theme.ForestGreen, name: 'Forest Green', color: 'bg-green-800' },
  { id: Theme.DarkRed, name: 'Dark Red', color: 'bg-red-800' },
  { id: Theme.Black, name: 'Onyx Black', color: 'bg-black' },
  { id: Theme.LightPastel, name: 'Light Pastel', color: 'bg-[#81A8D4]' },
  { id: Theme.WarmPastel, name: 'Warm Pastel', color: 'bg-[#FFAB91]' },
  { id: Theme.HighContrast, name: 'High Contrast', color: 'bg-yellow-400' },
];

const LANGUAGES = [
    { id: Language.EN, name: 'English' },
    { id: Language.TR, name: 'Türkçe' },
    { id: Language.DE, name: 'Deutsch' },
    { id: Language.ES, name: 'Español' },
];

const SettingSection: React.FC<{title: string; description: string; children: React.ReactNode}> = ({title, description, children}) => (
    <div className="border-b border-theme-border pb-6 mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-theme-text-secondary mt-1 mb-4">{description}</p>
        <div>{children}</div>
    </div>
);

const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLocale();
  const [reduceMotion, setReduceMotion] = useState(false);

  const handleHighContrastToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTheme(Theme.HighContrast);
    } else {
      // Revert to a default theme or the last non-high-contrast theme
      // For simplicity, we'll revert to DarkPurple.
      setTheme(Theme.DarkPurple);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{t('settings.title')}</h1>
      
      <SettingSection title={t('settings.theme.title')} description={t('settings.theme.description')}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`p-4 rounded-lg border-2 transition ${
                theme === t.id ? 'border-theme-accent' : 'border-transparent hover:border-theme-border'
              }`}
            >
              <div className={`w-full h-16 rounded-md ${t.color} mb-2`}></div>
              <p className="font-semibold">{t.name}</p>
            </button>
          ))}
        </div>
      </SettingSection>

      <SettingSection title={t('settings.language.title')} description={t('settings.language.description')}>
        <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="w-full max-w-xs p-2 bg-theme-bg-secondary border border-theme-border rounded-md focus:ring-2 focus:ring-theme-accent focus:outline-none">
            {LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
            ))}
        </select>
      </SettingSection>

      <SettingSection title={t('settings.accessibility.title')} description={t('settings.accessibility.description')}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label htmlFor="reduce-motion">{t('settings.accessibility.motion')}</label>
                <input
                  type="checkbox"
                  id="reduce-motion"
                  className="toggle-checkbox"
                  checked={reduceMotion}
                  onChange={(e) => setReduceMotion(e.target.checked)}
                />
            </div>
             <div className="flex items-center justify-between">
                <label htmlFor="high-contrast">{t('settings.accessibility.contrast_mode')}</label>
                <input
                  type="checkbox"
                  id="high-contrast"
                  className="toggle-checkbox"
                  checked={theme === Theme.HighContrast}
                  onChange={handleHighContrastToggle}
                />
            </div>
          </div>
          <style>{`
            .toggle-checkbox {
              appearance: none;
              width: 40px;
              height: 20px;
              background-color: var(--theme-border);
              border-radius: 10px;
              position: relative;
              cursor: pointer;
              transition: background-color 0.2s;
            }
            .toggle-checkbox:checked {
              background-color: var(--theme-accent);
            }
            .toggle-checkbox::before {
              content: '';
              position: absolute;
              width: 16px;
              height: 16px;
              background-color: white;
              border-radius: 50%;
              top: 2px;
              left: 2px;
              transition: transform 0.2s;
            }
            .toggle-checkbox:checked::before {
              transform: translateX(20px);
            }
          `}</style>
      </SettingSection>

    </div>
  );
};

export default SettingsPage;