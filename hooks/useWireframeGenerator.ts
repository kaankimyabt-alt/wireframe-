import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './useAppContext';
import { generateWireframe } from '../services/geminiService';
import { useToast } from './useToast';
import { useLocale } from '../contexts/LocaleContext';

export const useWireframeGenerator = () => {
  const { setPrompt, setWireframe, setIsLoading, incrementPrototypes, addComponentUsage } = useAppContext();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { t } = useLocale();

  const handleGenerate = useCallback(async (promptToGenerate: string) => {
    if (!promptToGenerate.trim()) return;
    
    setPrompt(promptToGenerate);
    setIsLoading(true);
    setWireframe([]);
    navigate('/wireframe');

    try {
      const result = await generateWireframe(promptToGenerate);
      setWireframe(result);
      incrementPrototypes();
      result.forEach(comp => addComponentUsage(comp.type));
    } catch (err: any) {
      addToast({ type: 'error', message: t(err.message || 'error.api.unknown') });
    } finally {
      setIsLoading(false);
    }
  }, [setPrompt, setIsLoading, setWireframe, navigate, incrementPrototypes, addComponentUsage, addToast, t]);

  return handleGenerate;
};
