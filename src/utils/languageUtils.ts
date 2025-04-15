/**
 * Type for supported languages
 */
export type Language = "en" | "fa";

/**
 * Default language
 */
export const DEFAULT_LANGUAGE: Language = "en";

/**
 * Key for storing language preference in localStorage
 */
const LANGUAGE_STORAGE_KEY = "zicoapp_language";

/**
 * Get the current language from localStorage
 * @returns The current language
 */
export const getLanguage = (): Language => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;

  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return storedLanguage === "en" || storedLanguage === "fa"
    ? storedLanguage
    : DEFAULT_LANGUAGE;
};

/**
 * Set the language preference in localStorage
 * @param language The language to set
 */
export const setLanguage = (language: Language): void => {
  if (typeof window === "undefined") return;

  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};

/**
 * Get the text direction based on language
 * @param language The language to check
 * @returns 'rtl' for Farsi, 'ltr' for English
 */
export const getTextDirection = (language: Language): "rtl" | "ltr" => {
  return language === "fa" ? "rtl" : "ltr";
};
