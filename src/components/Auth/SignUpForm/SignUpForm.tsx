import { useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';

import { type SignUpFormFields, signUpSchema } from './SignUpForm.schema';

import { useAuthFormError } from '@/hooks/useAuthFormError';

import { authService } from '@/services/auth/authService';

import { type AppDispatch } from '@/store';
import { setSignUpSubmitting } from '@/store/auth/authUISlice';
import { updateUserProfile } from '@/store/profile/profileSlice';

import AppSubmitButton from '@/components/Common/UI/Buttons/AppSubmitButton/AppSubmitButton';
import AppTextField from '@/components/Common/UI/Form/AppTextField/AppTextField';

const SignUpForm = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch<AppDispatch>();
	const handleError = useAuthFormError<SignUpFormFields>();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<SignUpFormFields>({
		resolver: zodResolver(signUpSchema(t)),
	});
	const [isLoading, setIsLoading] = useState(false);

	const stopGlobalLoading = (): void => {
		dispatch(setSignUpSubmitting(false));
	};

	const onSubmit = async (data: FieldValues) => {
		dispatch(setSignUpSubmitting(true));
		setIsLoading(true);

		try {
			// Create account and add display name to user profile
			const user = await authService.createAccount(data.email, data.password, {
				isProfilePending: true,
			});
			// Stop global loading because the user is already authenticated and will be redirected,
			// so the form is no longer needed and its blocking should be removed.
			stopGlobalLoading();

			const userUpdated = await authService.updateProfile(user.id, {
				displayName: data.displayName,
			});
			// Update authorization state (DisplayName)
			dispatch(updateUserProfile(userUpdated));
		} catch (error) {
			handleError(error, setError);
		} finally {
			// Even if an error
			stopGlobalLoading();
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
				disabled={isLoading}
				label={t('components.auth.signUpForm.displayName.placeholder')}
				error={!!errors.displayName}
				helperText={errors.displayName?.message}
				{...register('displayName')}
			/>
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
			<AppTextField
				type='password'
				disabled={isLoading}
				label={t('components.auth.signUpForm.confirmPassword')}
				error={!!errors.confirmPassword}
				helperText={errors.confirmPassword?.message}
				{...register('confirmPassword')}
			/>

			<AppSubmitButton loading={isLoading}>
				{t('components.auth.signUpForm.buttons.submit')}
			</AppSubmitButton>
		</Box>
	);
};

export default SignUpForm;
