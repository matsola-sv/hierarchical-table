import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Logout } from '@mui/icons-material';
import { Button, IconButton, useMediaQuery, useTheme } from '@mui/material';

export type LogoutButtonProps = {
	onClick: () => void;
};

const LogoutButton: FC<LogoutButtonProps> = ({ onClick }) => {
	const { t } = useTranslation();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	if (isMobile) {
		return (
			<IconButton
				onClick={onClick}
				color='inherit'
				size='small'
			>
				<Logout fontSize='small' />
			</IconButton>
		);
	}

	return (
		<Button
			onClick={onClick}
			variant='outlined'
			color='inherit'
			size='small'
			sx={{
				fontSize: { xs: '0.7rem', sm: '0.85rem' },
				textTransform: 'none',
				whiteSpace: 'nowrap',
			}}
		>
			{t('components.profile.shortProfile.buttons.signOut')}
		</Button>
	);
};

export default LogoutButton;
