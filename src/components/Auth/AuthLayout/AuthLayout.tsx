import { type FC, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import './AuthLayout.css';

interface AuthLayoutProps {
	left: ReactNode;
	right: ReactNode;
	title?: string;
	dividerText?: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({ title, left, right, dividerText }) => {
	const { t } = useTranslation();
	const locDividerText = dividerText ?? t('components.auth.authLayout.or');

	return (
		<div className='auth-wrapper'>
			<div className='auth-container'>
				{title && <h1 className='auth-title'>{title}</h1>}
				<div className='auth-content'>
					<div className='auth-left'>{left}</div>
					<div className='auth-divider'>
						{locDividerText && (
							<span className='auth-divider-text'>{locDividerText}</span>
						)}
					</div>
					<div className='auth-right'>{right}</div>
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
