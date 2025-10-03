
type TFunction = (key: string) => string;

export const getNavLinks = (t: TFunction) => [
  { name: t('nav.home'), path: '/', icon: 'home' },
  { name: t('nav.wireframe'), path: '/wireframe', icon: 'layout' },
  { name: t('nav.library'), path: '/library', icon: 'grid' },
  { name: t('nav.suggestions'), path: '/suggestions', icon: 'lightbulb' },
  { name: t('nav.guide'), path: '/guide', icon: 'book' },
  { name: t('nav.stats'), path: '/stats', icon: 'chart' },
  { name: t('nav.inspiration'), path: '/inspiration', icon: 'sparkles' },
  { name: t('nav.gemini_extension'), path: '/gemini-extension', icon: 'wand' },
  { name: t('nav.settings'), path: '/settings', icon: 'settings' },
];

export const getQuickSuggestions = (t: TFunction) => [
  t('suggestion.login'),
  t('suggestion.product'),
  t('suggestion.dashboard'),
  t('suggestion.weather'),
];