import { type FC } from 'react';

import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { Box, Paper, Typography } from '@mui/material';

type EmptyStateProps = {
	message?: string;
};

const EmptyState: FC<EmptyStateProps> = ({ message = 'No data available' }) => {
	return (
		<Paper
			elevation={0}
			sx={{
				p: 4,
				textAlign: 'center',
				backgroundColor: '#f9f9f9',
				borderRadius: 2,
				border: '1px dashed #ccc',
			}}
		>
			<Box
				display='flex'
				flexDirection='column'
				alignItems='center'
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
			</Box>
		</Paper>
	);
};

export default EmptyState;
