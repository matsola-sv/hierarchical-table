import { type FC, type ReactNode } from 'react';

import { Box, Typography } from '@mui/material';

export interface VerticalDividerProps {
	children?: ReactNode;
	thickness?: string; // Thickness line
	color?: string; // Color line
}

const VerticalDivider: FC<VerticalDividerProps> = ({
	children,
	thickness = '1px',
	color = 'divider',
}) => {
	return (
		<Box
			sx={{
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'transparent',

				// Width will automatically depend on the content
				px: 10, // Space on the sides
				'::before': {
					content: '""',
					position: 'absolute',
					height: '100%',
					width: thickness,
					backgroundColor: color,
				},
			}}
		>
			{children && (
				<Typography
					component='span'
					sx={{
						position: 'absolute',
						transform: 'rotate(-90deg)',
						backgroundColor: 'background.paper',
						px: 1,
						fontWeight: 'bold',
						fontSize: '0.75rem',
						color: 'text.secondary',
						whiteSpace: 'nowrap',
						zIndex: 1,
						userSelect: 'none',
					}}
				>
					{children}
				</Typography>
			)}
		</Box>
	);
};
export default VerticalDivider;
