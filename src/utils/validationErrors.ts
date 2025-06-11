import { type TFunction } from 'i18next';

export const requiredError = (t: TFunction, field: string) => {
	return t('errors.validation.required', { field: t(field) });
};

export const minError = (t: TFunction, field: string, min: number) => {
	return t('errors.validation.min', { field: t(field), min });
};

export const maxError = (t: TFunction, field: string, max: number) => {
	return t('errors.validation.max', { field: t(field), max });
};
