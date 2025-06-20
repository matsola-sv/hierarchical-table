import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import AuthLayout from '@/components/Auth/AuthLayout/AuthLayout';
import ProvidersOAuth from '@/components/Auth/ProvidersOAuth/ProvidersOAuth';
import SignUpForm from '@/components/Auth/SignUpForm/SignUpForm';
import ShortProfile from '@/components/Profile/ShortProfile/ShortProfile';

const SignUpPage: FC = () => {
	const { t } = useTranslation();

	// While the form is submitting to the server — disable OAuth buttons
	const formIsSubmitting = useTypedSelector(
		state => state.authUI.forms.signUp.submitting,
	);

	return (
		<>
			<ShortProfile />
			<AuthLayout
				title={t('components.auth.signUpForm.title')}
				left={<SignUpForm />}
				right={<ProvidersOAuth disabled={formIsSubmitting} />}
			/>
		</>
	);
};

export default SignUpPage;
