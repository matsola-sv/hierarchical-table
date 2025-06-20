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

	const onSubmit = async (data: FieldValues) => {
		setIsLoading(true);

		try {
			// Create account and add display name to user profile
			const user = await authService.createAccount(data.email, data.password, {
				isProfilePending: true,
			});
			const userUpdated = await authService.updateProfile(user.id, {
				displayName: data.displayName,
			});

			// Update authorization state (DisplayName)
			dispatch(updateUserProfile(userUpdated));
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
				label={t('components.auth.signUpForm.displayName.placeholder')}
				error={!!errors.displayName}
				helperText={errors.displayName?.message}
				{...register('displayName')}
			/>
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
			<AppTextField
				label={t('components.auth.signUpForm.confirmPassword')}
				type='password'
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
