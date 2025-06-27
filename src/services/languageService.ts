import i18n from 'i18next';

import { AppLanguage } from '@/models/language';

import { initI18n } from '@/core/i18n';

import { getPublicUrl } from '@/utils/url';

/** Storage key for current app language */
const LANG_KEY = 'appLanguage';

const isAppLanguage = (value: unknown): value is AppLanguage => {
	return Object.values(AppLanguage).includes(value as AppLanguage);
};

const saveLanguage = (lng: AppLanguage): void => {
	localStorage.setItem(LANG_KEY, lng);
};

const getSaveLanguage = (): string | null => {
	return localStorage.getItem(LANG_KEY);
};

const detectInitialLanguage = (): AppLanguage => {
	const saved = getSaveLanguage();
	const browserLang = navigator.language.split('-')[0];

	if (isAppLanguage(saved)) return saved;
	if (isAppLanguage(browserLang)) return browserLang;

	return AppLanguage.en;
};

export const languageService = {
	/** Initialize i18next with detected or default language. */
	init: async (defaultLng?: AppLanguage) => {
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

	/** Change current language and persist it. */
	changeLanguage: async (lng: AppLanguage): Promise<AppLanguage> => {
		await i18n.changeLanguage(lng);
		saveLanguage(lng);

		return lng;
	},

	/**
	 * Return current language.
	 * Guaranteed to be valid since it's set only via this service.
	 */
	getCurrent: (): AppLanguage => {
		return i18n.language as AppLanguage;
	},
};
