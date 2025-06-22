import { type FC } from 'react';

import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { Paper, type SxProps, type Theme, Typography } from '@mui/material';

export interface EmptyStateProps {
	message?: string;
	sx?: SxProps<Theme>; // Extra styles for the empty element
}

const EmptyState: FC<EmptyStateProps> = ({ message = 'No data available', sx }) => {
	return (
		<Paper
			elevation={0}
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center',
				backgroundColor: '#f9f9f9',
				...sx,
			}}
		>
			<SentimentDissatisfiedIcon
				color='disabled'
				sx={{ fontSize: 48 }}
			/>
			<Typography
				variant='h6'
				mt={2}
				color='text.secondary'
			>
				{message}
			</Typography>
		</Paper>
	);
};

export default EmptyState;
