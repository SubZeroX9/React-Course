/**
 * Available languages for i18n
 */
export const AVAILABLE_LANGUAGES = {
  ENGLISH: 'en',
  HEBREW: 'he',
} as const;

export type LanguageCode = typeof AVAILABLE_LANGUAGES[keyof typeof AVAILABLE_LANGUAGES];
