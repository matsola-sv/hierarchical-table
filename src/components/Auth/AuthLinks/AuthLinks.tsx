import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import type { SxProps, Theme } from '@mui/material';
import { Box, Link, Typography } from '@mui/material';

import * as ROUTES from '@/constants/routes';

const AuthLinks: FC = () => {
	const { t } = useTranslation();
	const linkSx: SxProps<Theme> = { color: 'common.white' };

	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			gap={1}
		>
			<Link
				component={RouterLink}
				to={ROUTES.SIGN_IN}
				variant='body2'
				underline='hover'
				sx={linkSx}
			>
				{t('components.auth.authLinks.signIn')}
			</Link>

			<Typography
				variant='body2'
				color='common.white'
			>
				|
			</Typography>

			<Link
				component={RouterLink}
				to={ROUTES.SIGN_UP}
				variant='body2'
				underline='hover'
				sx={linkSx}
			>
				{t('components.auth.authLinks.signUp')}
			</Link>
		</Box>
	);
};

export default AuthLinks;
