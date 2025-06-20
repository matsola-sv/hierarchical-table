import { useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';

import { type SignInFormFields, signInSchema } from './SignInForm.schema';

import { useAuthFormError } from '@/hooks/useAuthFormError';

import { sleep } from '@/utils/timing';

import { authService } from '@/services/auth/authService';

import AppSubmitButton from '@/components/Common/UI/Buttons/AppSubmitButton/AppSubmitButton';
import AppTextField from '@/components/Common/UI/Form/AppTextField/AppTextField';

const SignInForm = () => {
	const { t } = useTranslation();
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
		setIsLoading(true);
		try {
			await sleep(4000);
			await authService.signIn(data.email, data.password);
		} catch (error) {
			handleError(error, setError);
		} finally {
			setIsLoading(false); // Even if an error
		}
	};

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			noValidate
		>
			<AppTextField
				label={t('components.auth.signUpForm.email')}
				type='email'
				error={!!errors.email}
				helperText={errors.email?.message}
				{...register('email')}
			/>
			<AppTextField
				label={t('components.auth.signUpForm.password')}
				type='password'
				error={!!errors.password}
				helperText={errors.password?.message}
				{...register('password')}
			/>

			<AppSubmitButton loading={isLoading}>
				{t('components.auth.signUpForm.buttons.submit')}
			</AppSubmitButton>
		</Box>
	);
};

export default SignInForm;
