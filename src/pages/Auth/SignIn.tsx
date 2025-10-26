import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import AuthLayout from '@/components/Auth/AuthLayout';
import ProvidersOAuth from '@/components/Auth/ProvidersOAuth';
import SignInForm from '@/components/Auth/SignInForm';

const SignInPage: FC = () => {
	const { t } = useTranslation();

	// While the form is submitting to the server — disable OAuth buttons
	const formIsSubmitting = useTypedSelector(state => state.authUI.forms.signIn.submitting);

	return (
		<>
			<AuthLayout
				title={t('components.auth.signInForm.title')}
				left={<SignInForm />}
				right={<ProvidersOAuth disabled={formIsSubmitting} />}
			/>
		</>
	);
};

export default SignInPage;
