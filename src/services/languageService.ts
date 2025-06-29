import i18n from 'i18next';

import { AppLanguage } from '@/models/language';

import { initI18n } from '@/core/i18n';

import { getPublicUrl } from '@/utils/url';

export type LangChangeHandler = (lng: AppLanguage) => void;

export const languageService = (() => {
	const storageKey = 'appLanguage'; // Language key in localStorage
	const handlers = new Map<LangChangeHandler, LangChangeHandler>();

	const isAppLanguage = (value: unknown): value is AppLanguage => {
		return Object.values(AppLanguage).includes(value as AppLanguage);
	};

	const saveLanguage = (lng: AppLanguage): void => {
		localStorage.setItem(storageKey, lng);
	};

	const getSavedLanguage = (): string | null => {
		return localStorage.getItem(storageKey);
	};

	const detectInitialLanguage = (): AppLanguage => {
		const saved = getSavedLanguage();
		const browserLang = navigator.language.split('-')[0];

		if (isAppLanguage(saved)) return saved;
		if (isAppLanguage(browserLang)) return browserLang;

		return AppLanguage.en;
	};

	return {
		/** Initialize i18next with detected or default language. */
		init: async (defaultLng?: AppLanguage): Promise<void> => {
			const lng = defaultLng ?? detectInitialLanguage();

			// Init i18next singleton instance
			// fallbackLng - fallback language if translation is missing
			await initI18n({
				defaultLng: lng,
				fallbackLng: AppLanguage.en,
				loadPath: getPublicUrl('locales/{{lng}}/{{ns}}.json'),
			});

			saveLanguage(lng);
		},

		/** Returns the list of available application languages. */
		getLanguages: (): AppLanguage[] => {
			return Object.values(AppLanguage);
		},

		/**
		 * Return current language.
		 * Guaranteed to be valid since it's set only via this service.
		 */
		getCurrent: (): AppLanguage => {
			return i18n.language as AppLanguage;
		},

		/** Update current language and persist it. */
		changeLanguage: async (lng: AppLanguage): Promise<AppLanguage> => {
			await i18n.changeLanguage(lng);
			saveLanguage(lng);

			return lng;
		},

		/** Subscribe to language change. */
		onChange: (callback: LangChangeHandler): void => {
			const wrapped: LangChangeHandler = (lng: AppLanguage) => {
				if (isAppLanguage(lng)) callback(lng);
			};

			handlers.set(callback, wrapped);
			i18n.on('languageChanged', wrapped);
		},

		/** Unsubscribe from language change. */
		offChange: (callback: LangChangeHandler): void => {
			const wrapped = handlers.get(callback);

			if (wrapped) {
				i18n.off('languageChanged', wrapped);
				handlers.delete(callback);
			}
		},
	};
})();
