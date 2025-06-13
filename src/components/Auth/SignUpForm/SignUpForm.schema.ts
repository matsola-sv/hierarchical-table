import type { TFunction } from 'i18next';
import { z } from 'zod';

import { signInSchema } from '@/components/Auth/SignInForm/SignInForm.schema';

import { maxError, requiredError } from '@/utils/validationErrors';

export const signUpSchema = (t: TFunction) => {
	const baseKey = 'components.auth.signUpForm';

	return signInSchema(t)
		.extend({
			displayName: z
				.string()
				.nonempty(requiredError(t, `${baseKey}.displayName.title`))
				.max(20, maxError(t, `${baseKey}.displayName.title`, 20)),
			confirmPassword: z.string(),
		})
		.refine(data => data.password === data.confirmPassword, {
			message: t(`${baseKey}.errors.confirmPassword.match`),
			path: ['confirmPassword'],
		});
};

export type SignUpFormFields = z.infer<ReturnType<typeof signUpSchema>>;
