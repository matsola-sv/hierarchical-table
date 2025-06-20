import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import AuthLayout from '@/components/Auth/AuthLayout/AuthLayout';
import ProvidersOAuth from '@/components/Auth/ProvidersOAuth/ProvidersOAuth';
import SignInForm from '@/components/Auth/SignInForm/SignInForm';
import ShortProfile from '@/components/Profile/ShortProfile/ShortProfile';

const SignInPage: FC = () => {
	const { t } = useTranslation();

	// While the form is submitting to the server — disable OAuth buttons
	const formIsSubmitting = useTypedSelector(
		state => state.authUI.forms.signIn.submitting,
	);

	return (
		<>
			<ShortProfile />
			<AuthLayout
				title={t('components.auth.signInForm.title')}
				left={<SignInForm />}
				right={<ProvidersOAuth disabled={formIsSubmitting} />}
			/>
		</>
	);
};

export default SignInPage;
