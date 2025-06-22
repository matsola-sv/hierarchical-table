import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { AppBar, Box, Toolbar, Typography } from '@mui/material';

import type { ResponsiveValues } from '@/models/ui';

import * as ROUTES from '@/constants/routes';

import ShortProfile from '@/components/Profile/ShortProfile/ShortProfile';

export interface HeaderProps {
	height?: ResponsiveValues<number | string>;
}

const Header: FC<HeaderProps> = ({ height }) => {
	const { t } = useTranslation();

	return (
		<AppBar
			position='fixed'
			color='primary'
			sx={{ height: height }}
		>
			<Toolbar
				sx={{
					height: '100%',
					justifyContent: 'space-between',
					px: 2,
				}}
			>
				{/* Logo in left part */}
				<Typography
					variant='h6'
					component={Link}
					to={ROUTES.HOME}
					sx={{ textDecoration: 'none', color: 'inherit' }}
				>
					{t('components.common.header.title')}
				</Typography>

				<Box
					sx={{
						flexBasis: { xs: '50%', sm: '30%' },
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
					}}
				>
					<ShortProfile />
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
