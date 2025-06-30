import { useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';

import { type SignInFormFields, signInSchema } from './SignInForm.schema';

import { useAuthFormError } from '@/hooks/useAuthFormError';

import { authService } from '@/services/auth/authService';

import type { AppDispatch } from '@/store';
import { setSignInSubmitting } from '@/store/auth/authUISlice';

import AppSubmitButton from '@/components/Common/UI/Buttons/AppSubmitButton/AppSubmitButton';
import AppTextField from '@/components/Common/UI/Form/AppTextField/AppTextField';

const SignInForm = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch<AppDispatch>();
	const handleError = useAuthFormError<SignInFormFields>();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<SignInFormFields>({
		resolver: zodResolver(signInSchema(t)),
	});
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (data: FieldValues) => {
		dispatch(setSignInSubmitting(true));
		setIsLoading(true);

		try {
			await authService.signIn(data.email, data.password);
		} catch (error) {
			handleError(error, setError);
		} finally {
			// Even if an error
			dispatch(setSignInSubmitting(false));
			setIsLoading(false);
		}
	};

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			noValidate
		>
			<AppTextField
				type='email'
				disabled={isLoading}
				label={t('components.auth.signUpForm.email')}
				error={!!errors.email}
				helperText={errors.email?.message}
				{...register('email')}
			/>
			<AppTextField
				type='password'
				disabled={isLoading}
				label={t('components.auth.signUpForm.password')}
				error={!!errors.password}
				helperText={errors.password?.message}
				{...register('password')}
			/>

			<AppSubmitButton loading={isLoading}>
				{t('components.auth.signInForm.buttons.submit')}
			</AppSubmitButton>
		</Box>
	);
};

export default SignInForm;
