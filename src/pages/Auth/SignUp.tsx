import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import AuthLayout from '@/components/Auth/AuthLayout/AuthLayout';
import ProvidersOAuth from '@/components/Auth/ProvidersOAuth/ProvidersOAuth';
import SignUpForm from '@/components/Auth/SignUpForm/SignUpForm';
import ShortProfile from '@/components/Profile/ShortProfile/ShortProfile';

const SignUpPage: FC = () => {
	const { t } = useTranslation();

	return (
		<>
			<ShortProfile />
			<AuthLayout
				title={t('components.auth.signUpForm.title')}
				left={<SignUpForm />}
				right={<ProvidersOAuth />}
			/>
		</>
	);
};

export default SignUpPage;
