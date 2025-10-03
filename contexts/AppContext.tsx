import React, { createContext, useState, ReactNode, useCallback } from 'react';
import type { AppContextType, WireframeComponent, WireframeComponentType } from '../types';

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [wireframe, setWireframe] = useState<WireframeComponent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [stats, setStats] = useState<AppContextType['stats']>(() => {
      try {
        const savedStats = localStorage.getItem('app-stats');
        return savedStats ? JSON.parse(savedStats) : { prototypesCreated: 0, componentsUsed: {} };
      } catch {
        return { prototypesCreated: 0, componentsUsed: {} };
      }
  });

  const updateStats = (updater: (prevStats: AppContextType['stats']) => AppContextType['stats']) => {
      setStats(prev => {
          const newStats = updater(prev);
          localStorage.setItem('app-stats', JSON.stringify(newStats));
          return newStats;
      });
  }

  const incrementPrototypes = useCallback(() => {
    updateStats((prev) => ({ ...prev, prototypesCreated: prev.prototypesCreated + 1 }));
  }, []);

  const addComponentUsage = useCallback((type: WireframeComponentType) => {
    updateStats((prev) => {
        const newComponentsUsed = { ...prev.componentsUsed };
        newComponentsUsed[type] = (newComponentsUsed[type] || 0) + 1;
        return { ...prev, componentsUsed: newComponentsUsed };
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        prompt,
        setPrompt,
        wireframe,
        setWireframe,
        isLoading,
        setIsLoading,
        stats,
        incrementPrototypes,
        addComponentUsage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
