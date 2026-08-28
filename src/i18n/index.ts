import en from './en.json';
import bn from './bn.json';

export const languages = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'bn', label: 'বাংলা', short: 'বাং' },
] as const;

export const defaultLang = 'en' as const;

export type Lang = (typeof languages)[number]['code'];

const dictionaries: Record<Lang, unknown> = { en, bn };

/** Narrow an arbitrary string (e.g. Astro.currentLocale) to a supported Lang. */
export function toLang(value: string | undefined): Lang {
  return value === 'bn' ? 'bn' : defaultLang;
}

function lookup(dict: unknown, path: string): unknown {
  return path
    .split('.')
    .reduce<unknown>(
      (acc, part) =>
        acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[part] : undefined,
      dict,
    );
}

/**
 * Returns `t` (string lookup) and `tList` (array lookup) for a locale.
 * Missing keys fall back to English, then to the key itself, so a gap in a
 * translation degrades to readable text rather than blowing up the build.
 */
export function useTranslations(lang: Lang) {
  const t = (key: string): string => {
    const value = lookup(dictionaries[lang], key) ?? lookup(dictionaries[defaultLang], key);
    return typeof value === 'string' ? value : key;
  };

  const tList = <T = Record<string, string>>(key: string): T[] => {
    const value = lookup(dictionaries[lang], key) ?? lookup(dictionaries[defaultLang], key);
    return Array.isArray(value) ? (value as T[]) : [];
  };

  return { t, tList };
}

/** Prefix a root-relative path with the locale segment (English stays at root). */
export function localizePath(path: string, lang: Lang): string {
  if (lang === defaultLang) return path;
  if (path.startsWith('#')) return path;
  return `/${lang}${path === '/' ? '' : path}` || '/';
}

/** The original renders every figure in Bengali numerals when lang is `bn`. */
export function formatNumber(value: number, lang: Lang): string {
  return lang === 'bn' ? value.toLocaleString('bn-BD') : value.toLocaleString('en-US');
}
