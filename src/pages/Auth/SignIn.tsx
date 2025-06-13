import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import AuthLayout from '@/components/Auth/AuthLayout/AuthLayout';
import ProvidersOAuth from '@/components/Auth/ProvidersOAuth/ProvidersOAuth';
import SignInForm from '@/components/Auth/SignInForm/SignInForm';
import ShortProfile from '@/components/Profile/ShortProfile/ShortProfile';

const SignInPage: FC = () => {
	const { t } = useTranslation();

	return (
		<>
			<ShortProfile />
			<AuthLayout
				title={t('components.auth.signInForm.title')}
				left={<SignInForm />}
				right={<ProvidersOAuth />}
			/>
		</>
	);
};

export default SignInPage;
