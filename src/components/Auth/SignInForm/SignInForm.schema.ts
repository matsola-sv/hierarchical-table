import type { TFunction } from 'i18next';
import { z } from 'zod';

import { maxError, minError, requiredError } from '@/utils/validationErrors';

export const signInSchema = (t: TFunction) => {
	const baseKey = 'components.auth.signUpForm';

	return z.object({
		email: z
			.string()
			.nonempty(requiredError(t, `${baseKey}.email`))
			.max(25, maxError(t, `${baseKey}.email`, 25))
			.email(),
		password: z
			.string()
			.nonempty(requiredError(t, `${baseKey}.password`))
			.min(8, minError(t, `${baseKey}.password`, 8)),
	});
};

export type SignInFormFields = z.infer<ReturnType<typeof signInSchema>>;
