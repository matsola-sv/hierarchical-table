import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import * as ROUTES from '@/constants/routes';

const AuthLinks: FC = () => {
	const { t } = useTranslation();

	return (
		<div className='auth-links'>
			<Link to={ROUTES.SIGN_IN}>{t('components.auth.authLinks.signIn')}</Link>
			{' | '}
			<Link to={ROUTES.SIGN_UP}>{t('components.auth.authLinks.signUp')}</Link>
		</div>
	);
};

export default AuthLinks;
