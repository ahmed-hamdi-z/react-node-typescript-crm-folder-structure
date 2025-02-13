import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import togglesConfig from './redux/dashboard/toggles-config';

i18n
    // learn more: https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        fallbackLng: togglesConfig.locale || 'en',
        debug: false,
        load: 'languageOnly'
    });
export default i18n;
