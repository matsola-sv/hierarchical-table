import { AppLanguage, type LanguageMeta } from '@/models/language';

/** 
 * flag — emoji flag character rendered using font glyphs 
 */
export const LANGUAGES_META: Record<AppLanguage, LanguageMeta> = {
	[AppLanguage.en]: { label: 'English', flag: '🇬🇧' },
	[AppLanguage.cs]: { label: 'Čeština', flag: '🇨🇿' },
	[AppLanguage.uk]: { label: 'Українська', flag: '🇺🇦' },
};
