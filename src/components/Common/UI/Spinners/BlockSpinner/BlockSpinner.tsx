import type { FC } from 'react';

import { Box, CircularProgress, type CircularProgressProps } from '@mui/material';

const BlockSpinner: FC<CircularProgressProps> = ({ size = 20, ...rest }) => {
	return (
		<Box
			sx={{
				position: 'absolute',
				inset: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'rgba(255, 255, 255, 0.25)',
				zIndex: 1,
			}}
		>
			<CircularProgress
				size={size}
				{...rest}
			/>
		</Box>
	);
};

export default BlockSpinner;
