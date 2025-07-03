export const normalizeError = (error: unknown, defaultMessage?: string): Error => {
	if (error instanceof Error) {
		return error;
	}

	if (typeof error === 'string') {
		return new Error(error);
	}
	return new Error(defaultMessage || 'An unknown error');
};

export const logError = (error: unknown, defaultMessage?: string): void => {
	console.error(normalizeError(error, defaultMessage));
};
