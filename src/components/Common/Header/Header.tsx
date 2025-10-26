import type { FC } from 'react';

import { AppBar, Box, Toolbar } from '@mui/material';

import type { ResponsiveValues } from '@/models/ui';

import LangSwitcher from '@/components/AppFeatures/LangSwitcher';
import Logo from '@/components/Common/Logo';
import ShortProfile from '@/components/Profile/ShortProfile';

export interface HeaderProps {
	height?: ResponsiveValues<number | string>;
}

const Header: FC<HeaderProps> = ({ height }) => {
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
				{/* Left part */}
				<Logo />

				{/* Right part */}
				<Box
					sx={{
						flexBasis: { xs: '60%', sm: '30%' },
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
					}}
				>
					<LangSwitcher />
					<ShortProfile />
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
