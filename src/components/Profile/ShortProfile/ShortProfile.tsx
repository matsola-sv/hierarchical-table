import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';

import { useAuth } from '@/hooks/useAuth';

import { getDisplayName } from '@/utils/profile';

import { authService } from '@/services/auth/authService';

import AuthLinks from '@/components/Auth/AuthLinks/AuthLinks';
import BlockSpinner from '@/components/Common/UI/Spinners/BlockSpinner/BlockSpinner';
import UserAvatar from '@/components/Profile/UserAvatar/UserAvatar';

export const ShortProfile: FC = () => {
	const { t } = useTranslation();
	const { isAuthenticated, profile, isLoadingProfile, authChecked } = useAuth();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	// If auth check hasn't been completed or profile is still loading
	if (!authChecked || isLoadingProfile) {
		return (
			<Box sx={{ position: 'relative', width: '100%', minHeight: '2rem' }}>
				<BlockSpinner />
			</Box>
		);
	}

	// If user is not authenticated or profile is missing
	if (!isAuthenticated || !profile) {
		return <AuthLinks />;
	}

	const displayName: string = getDisplayName(profile?.displayName, t);
	const logoutBtnSize = isMobile ? 'small' : 'medium';

	const handleLogout = async () => {
		await authService.signOut();
	};

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: 1.5,
				flexWrap: 'nowrap',
				px: 1,
				py: 0.5,
				overflow: 'hidden',
			}}
		>
			<UserAvatar
				alt={displayName}
				src={profile.avatar}
			/>

			<Typography
				variant='body1'
				sx={{
					fontSize: { xs: '0.85rem', sm: '1rem' },
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					maxWidth: { xs: 100, sm: 160 },
				}}
			>
				{displayName}
			</Typography>

			<Button
				onClick={handleLogout}
				variant='outlined'
				color='inherit'
				size={logoutBtnSize}
				sx={{
					fontSize: { xs: '0.7rem', sm: '0.85rem' },
					textTransform: 'none',
					whiteSpace: 'nowrap',
				}}
			>
				{t('components.profile.shortProfile.buttons.signOut')}
			</Button>
		</Box>
	);
};
export default ShortProfile;
