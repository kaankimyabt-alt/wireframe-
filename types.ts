export enum Theme {
  DarkPurple = 'theme-dark-purple',
  ForestGreen = 'theme-forest-green',
  DarkRed = 'theme-dark-red',
  Black = 'theme-black',
  LightPastel = 'theme-light-pastel',
  WarmPastel = 'theme-warm-pastel',
  HighContrast = 'theme-high-contrast',
}

export enum Language {
  EN = 'en',
  TR = 'tr',
  DE = 'de',
  ES = 'es',
}

export interface LocaleContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, replacements?: Record<string, string>) => string;
}

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: number) => void;
}

export type WireframeComponentType = 'container' | 'button' | 'input' | 'text' | 'image' | 'icon';

export interface WireframeComponent {
  id: string;
  type: WireframeComponentType;
  text?: string;
  placeholder?: string;
  icon?: string;
  layout: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface AppContextType {
  prompt: string;
  setPrompt: (prompt: string) => void;
  wireframe: WireframeComponent[];
  setWireframe: (wireframe: WireframeComponent[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  stats: {
    prototypesCreated: number;
    componentsUsed: Record<string, number>;
  };
  incrementPrototypes: () => void;
  addComponentUsage: (type: WireframeComponentType) => void;
}
