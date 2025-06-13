import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';

import { useSnackbar } from 'notistack';

import { AuthErrorFields } from '@/models/auth';

import { parseAuthError } from '@/services/auth/authService';

/**
 * Custom hook for handling authentication form errors.
 * Maps field-specific errors to react-hook-form and shows generic errors via snackbar.
 */
export function useAuthFormError<T extends FieldValues>() {
	const { enqueueSnackbar } = useSnackbar();

	return (error: unknown, setError: UseFormSetError<T>) => {
		const fieldError = parseAuthError(error, false);

		if (fieldError.field !== AuthErrorFields.Generic) {
			setError(fieldError.field as Path<T>, {
				type: 'manual',
				message: fieldError.message,
			});
		} else {
			enqueueSnackbar(fieldError.message, { variant: 'error' });
		}
	};
}
