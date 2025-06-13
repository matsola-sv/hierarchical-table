import { type TFunction } from 'i18next';

import type { OptString } from '@/models/common/types';

/**
 * The translation function from i18next, passed to facilitate testing and mocking.
 */
export const getDisplayName = (displayName: OptString, t: TFunction): string => {
	return displayName ?? t('components.profile.defaultName');
};
