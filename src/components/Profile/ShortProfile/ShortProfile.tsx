import { useTranslation } from 'react-i18next';

import { useAuth } from '@/hooks/useAuth';

import { getDisplayName } from '@/utils/profile';

import { authService } from '@/services/auth/authService';

import AuthLinks from '@/components/Auth/AuthLinks/AuthLinks';

import './ShortProfile.css';

export const ShortProfile: React.FC = () => {
	const { t } = useTranslation();
	const { isAuthenticated, profile } = useAuth();

	const displayName: string = getDisplayName(profile?.displayName, t);

	if (!isAuthenticated || !profile) {
		return <AuthLinks />;
	}

	const handleLogout = async () => {
		await authService.signOut();
	};

	return (
		<div className='short-profile'>
			<span className='short-profile__name'>{displayName}</span>
			<button
				className='short-profile__logout-btn'
				onClick={handleLogout}
			>
				{t('components.profile.shortProfile.buttons.signOut')}
			</button>
		</div>
	);
};

export default ShortProfile;
