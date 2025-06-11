import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';

import { getPublicUrl } from '@/utils/url';

i18n.use(HttpBackend) // Enables HTTP backend to load translations from /public/locales
	.use(initReactI18next)
	.init({
		// Default language
		lng: 'en',

		// Fallback language if translation is missing
		fallbackLng: 'en',
		backend: {
			// Path to translation files
			loadPath: getPublicUrl('locales/{{lng}}/{{ns}}.json'),
		},
		interpolation: {
			// React already escapes by default
			escapeValue: false,
		},
	});

export default i18n;
