import { initReactI18next } from 'react-i18next';

import i18n, { type TFunction } from 'i18next';
import HttpBackend from 'i18next-http-backend';

interface init18nOptions {
	defaultLng: string;
	fallbackLng: string;
	loadPath: string;
}

export function initI18n(options: init18nOptions): Promise<TFunction> {
	return i18n
		.use(HttpBackend)
		.use(initReactI18next)
		.init({
			lng: options.defaultLng,
			fallbackLng: options.fallbackLng,
			backend: {
				loadPath: options.loadPath,
			},
			interpolation: {
				escapeValue: false,
			},
		});
}

export default i18n;
