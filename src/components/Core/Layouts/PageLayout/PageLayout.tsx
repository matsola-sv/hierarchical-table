import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import Header from '@/components/Common/Header/Header';

/**
 * Responsive layout with a fixed (per breakpoint) header and full-height content area.
 */
const PageLayout: FC = () => {
	const pageContentSx = {
		flexGrow: 1,
		bgcolor: '#f5f5f5',
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
			}}
		>
			<Header />

			{/* Main page content */}
			<Box
				component='main'
				sx={pageContentSx}
			>
				<Outlet />
			</Box>
		</Box>
	);
};

export default PageLayout;
