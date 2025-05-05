export const fallbackLng = 'ar';
export const languages = ['ar', 'en', 'fr', 'es', 'de', 'zh', 'ja', 'ko', 'tr', 'pt', 'it', 'hi'];
export const defaultNS = 'common';

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
} 