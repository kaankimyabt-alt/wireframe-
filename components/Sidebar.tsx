
import React from 'react';
import { NavLink } from 'react-router-dom';
import { getNavLinks } from '../constants';
import Icon from './Icon';
import { useLocale } from '../contexts/LocaleContext';

const Sidebar: React.FC = () => {
  const { t } = useLocale();
  const NAV_LINKS = getNavLinks(t);

  return (
    <nav className="w-16 md:w-64 bg-theme-bg-secondary flex flex-col">
      <div className="flex items-center justify-center md:justify-start h-20 px-4 md:px-6 border-b border-theme-border">
        <Icon name="logo" className="h-8 w-8 text-theme-accent" />
        <h1 className="hidden md:block text-xl font-bold ml-3">{t('app.name')}</h1>
      </div>
      <ul className="flex-1 py-6 space-y-2">
        {NAV_LINKS.map((link) => (
          <li key={link.name} className="px-4 md:px-6">
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-theme-accent text-white'
                    : 'text-theme-text-secondary hover:bg-theme-border hover:text-theme-text'
                }`
              }
            >
              <Icon name={link.icon} className="h-6 w-6" />
              <span className="hidden md:block ml-4">{link.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="p-4 border-t border-theme-border text-center text-xs text-theme-text-secondary hidden md:block">
        <p>{t('app.copyright')}</p>
      </div>
    </nav>
  );
};

export default Sidebar;
