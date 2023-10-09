import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '@assets/i18n/en.json';
import korean from '@assets/i18n/korean.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'korean',
  fallbackLng: 'korean',
  resources: {
    en: en,
    korean: korean,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
