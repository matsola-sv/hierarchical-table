import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/hooks/useAuth';

import { getDisplayName } from '@/utils/profile';

import { authService } from '@/services/auth/authService';

import AuthLinks from '@/components/Auth/AuthLinks/AuthLinks';
import BlockSpinner from '@/components/Common/UI/Spinners/BlockSpinner/BlockSpinner';

import './ShortProfile.css';

export const ShortProfile: FC = () => {
	const { t } = useTranslation();
	const { isAuthenticated, profile, isLoadingProfile, authChecked } = useAuth();

	const displayName: string = getDisplayName(profile?.displayName, t);
	const wrapperClass: string = 'short-profile';

	// If auth check hasn't been completed or profile is still loading
	if (!authChecked || isLoadingProfile) {
		return (
			<div className={`${wrapperClass}--spinner`}>
				<BlockSpinner />
			</div>
		);
	}

	// If user is not authenticated or profile is missing
	if (!isAuthenticated || !profile) {
		return <AuthLinks />;
	}

	const handleLogout = async () => {
		await authService.signOut();
	};

	return (
		<div className={wrapperClass}>
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
