
import { en } from './en';
import { tr } from './tr';
import { de } from './de';
import { es } from './es';
import { Language } from '../types';

export const translations: Record<Language, Record<string, string>> = {
  [Language.EN]: en,
  [Language.TR]: tr,
  [Language.DE]: de,
  [Language.ES]: es,
};
