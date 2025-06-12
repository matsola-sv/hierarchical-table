import type { FC } from 'react';

import { Box, CircularProgress } from '@mui/material';

const BlockSpinner: FC = () => {
	return (
		<Box
			sx={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'rgba(255, 255, 255, 0.5)',
				zIndex: 10,
			}}
		>
			<CircularProgress />
		</Box>
	);
};

export default BlockSpinner;
