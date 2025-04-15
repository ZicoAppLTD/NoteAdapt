import { Language } from "./languageUtils";

// Import translations
import enTranslations from "../translations/en.json";
import faTranslations from "../translations/fa.json";

type TranslationKey = keyof typeof enTranslations;

const translations = {
  en: enTranslations,
  fa: faTranslations,
} as const;

/**
 * Get a translation for a given key and language
 * @param key The translation key
 * @param language The language to get the translation for
 * @returns The translated text
 */
export const getTranslation = (key: string, language: Language): string => {
  const keys = key.split(".");
  let current: any = translations[language];

  for (const k of keys) {
    if (current[k] === undefined) {
      console.warn(
        `Translation key "${key}" not found for language "${language}"`
      );
      return key;
    }
    current = current[k];
  }

  return current;
};
