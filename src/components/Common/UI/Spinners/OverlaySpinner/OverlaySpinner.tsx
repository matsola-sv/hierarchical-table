import type { FC } from 'react';

import { Box, CircularProgress } from '@mui/material';

const OverlaySpinner: FC = () => {
	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100vw',
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'rgba(255, 255, 255, 0.5)',
				zIndex: 1300,
			}}
		>
			<CircularProgress />
		</Box>
	);
};
export default OverlaySpinner;
