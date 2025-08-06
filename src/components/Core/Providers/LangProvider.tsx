import { type FC, type PropsWithChildren, useEffect, useState } from 'react';

import type { AppLanguage } from '@/models/language';

import { languageService } from '@/services/language/languageService';

import OverlaySpinner from '@/components/Common/UI/Spinners/OverlaySpinner/OverlaySpinner';

interface LangProviderProps extends PropsWithChildren {
	lng?: AppLanguage; // Default language
}

/**
 * Provides translations by initializing i18n once on mount.
 * Prevents rendering until translation resources are ready.
 */
const LangProvider: FC<LangProviderProps> = ({ children, lng }) => {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		async function initLang() {
			try {
				await languageService.init(lng);
			} catch (err) {
				console.error(`[i18n] Failed to initialize language "${lng}":`, err);
			}
			setReady(true);
		}
		initLang();
	}, [lng]);

	if (!ready) {
		return <OverlaySpinner />;
	}

	return <>{children}</>;
};

export default LangProvider;
