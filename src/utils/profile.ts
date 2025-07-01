import { type TFunction } from 'i18next';

import type { OptString } from '@/models/common/types';
import type { AvatarOptions } from '@/models/identity';

/**
 * The translation func from i18next, passed to facilitate testing and mocking.
 */
export const getDisplayName = (displayName: OptString, t: TFunction): string => {
	return displayName ?? t('components.profile.defaultName');
};

/**
 * Create avatar URL with optional color and background.
 */
export const createAvatarUrl = (name: string, params: AvatarOptions): string => {
	const { background, color } = params;

	if (Boolean(color) !== Boolean(background)) {
		throw new Error('Please provide both "background" and "color", or omit both.');
	}

	const words = name.trim().split(/\s+/);
	const length = words.length === 1 ? 1 : 2;
	const formatColor = (color: string) => color.replace(/^#/, '');

	const urlParams = new URLSearchParams({
		name: name.trim(),
		length: length.toString(),
	});

	if (color) {
		urlParams.set('color', formatColor(color));
	}

	if (background) {
		urlParams.set('background', formatColor(background));
	}
	return `https://ui-avatars.com/api/?${urlParams.toString()}`;
};

/**
 * Generate avatar URL with random colors
 */
export const createRandomAvatarUrl = (name: string): string => {
	return createAvatarUrl(name, {
		color: 'random',
		background: 'random',
	});
};
