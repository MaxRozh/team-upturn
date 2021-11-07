// eslint-disable-next-line @typescript-eslint/no-var-requires
const { LOCALES_LIST, DEFAULT_LOCALE } = require('./src/constants/locales');

module.exports = {
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    fallbackLng: DEFAULT_LOCALE,
    locales: LOCALES_LIST,
    defaultNS: 'common',
    otherLanguages: LOCALES_LIST,
    browserLanguageDetection: true,
    serverLanguageDetection: true,
    ignoreRoutes: ['/_next/', '/public/', '/api/', '/service-worker.js', '/service-worker.js.map', '/health'],
    react: {
      useSuspense: false
    }
  }
};
