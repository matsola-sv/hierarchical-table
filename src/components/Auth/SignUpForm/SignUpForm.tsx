import { useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { zodResolver } from '@hookform/resolvers/zod';

import { type SignUpFormFields, signUpSchema } from './SignUpForm.schema';

import { useAuthFormError } from '@/hooks/useAuthFormError';

import { authService } from '@/services/auth/authService';

import { type AppDispatch } from '@/store';
import { updateUserProfile } from '@/store/profile/profileSlice';

import OverlaySpinner from '@/components/Common/UI/Spinners/OverlaySpinner/OverlaySpinner';

import '@/components/Auth/AuthForms.css';

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

	if (isLoading) {
		return <OverlaySpinner />;
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='auth-form'
		>
			<div className='form-group'>
				<input
					{...register('displayName')}
					type='text'
					placeholder={t('components.auth.signUpForm.displayName.placeholder')}
					className='form-input'
				/>
			</div>
			{errors.displayName && (
				<p className='text-red-500'>{`${errors.displayName.message}`}</p>
			)}

			<div className='form-group'>
				<input
					{...register('email')}
					type='email'
					placeholder={t('components.auth.signUpForm.email')}
					className='form-input'
				/>
			</div>
			{errors.email && <p className='text-red-500'>{`${errors.email.message}`}</p>}

			<div className='form-group'>
				<input
					{...register('password')}
					type='password'
					className='form-input'
					placeholder={t('components.auth.signUpForm.password')}
				/>
			</div>
			{errors.password && (
				<p className='text-red-500'>{`${errors.password.message}`}</p>
			)}

			<div className='form-group'>
				<input
					{...register('confirmPassword')}
					type='password'
					className='form-input'
					placeholder={t('components.auth.signUpForm.confirmPassword')}
				/>
			</div>
			{errors.confirmPassword && (
				<p className='text-red-500'>{`${errors.confirmPassword.message}`}</p>
			)}

			<button
				type='submit'
				className='form-button'
			>
				{t('components.auth.signUpForm.buttons.submit')}
			</button>
		</form>
	);
};

export default SignUpForm;
