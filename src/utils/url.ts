/**
 * Using getPublicUrl to add the base path (VITE_PUBLIC_URL) for correct routing
 * when the app is deployed in a subdirectory (e.g., on GitHub Pages).
 * It ensures that the paths are correctly formed with the base URL.
 *
 * @param path
 */
export const getPublicUrl = (path?: string): string => {
	const publicUrl = (import.meta.env.VITE_PUBLIC_URL || '').replace(/\/+$/, ''); // Remove extra "/" at the end

	if (!path) {
		return publicUrl;
	}

	const separator = path.startsWith('/') ? '' : '/';
	return `${publicUrl}${separator}${path}`;
};

/**
 * Returns a relative path inside the "public/images" folder.
 * Example: getPublicImage('flags/ua.svg') → 'public/images/flags/ua.svg'
 */
export const getPublicImage = (path: string): string => {
	return getPublicUrl(`images/${path}`);
};
