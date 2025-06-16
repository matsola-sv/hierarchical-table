import { useState } from 'react';
import { type FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';

import { type SignInFormFields, signInSchema } from './SignInForm.schema';

import { useAuthFormError } from '@/hooks/useAuthFormError';

import { authService } from '@/services/auth/authService';

import OverlaySpinner from '@/components/Common/UI/Spinners/OverlaySpinner/OverlaySpinner';

import '@/components/Auth/AuthForms.css';

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
			await authService.signIn(data.email, data.password);
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

			<button
				type='submit'
				className='form-button'
			>
				{t('components.auth.signUpForm.buttons.submit')}
			</button>
		</form>
	);
};

export default SignInForm;
