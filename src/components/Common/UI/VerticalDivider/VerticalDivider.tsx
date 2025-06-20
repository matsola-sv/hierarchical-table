import { type ReactNode } from 'react';

import { Box } from '@mui/material';

import './VerticalDivider.css';

interface VerticalDividerProps {
	children?: ReactNode;
}

const VerticalDivider: React.FC<VerticalDividerProps> = ({ children }) => (
	<Box className='vertical-divider'>
		{children && <span className='vertical-divider-text'>{children}</span>}
	</Box>
);

export default VerticalDivider;
