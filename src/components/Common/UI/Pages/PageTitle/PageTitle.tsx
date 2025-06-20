import type { FC, ReactNode } from 'react';

import { Typography } from '@mui/material';

export interface PageTitleProps {
	children: ReactNode;
}

const PageTitle: FC<PageTitleProps> = ({ children }) => {
	return (
		<Typography
			variant='h4'
			component='h1'
			textAlign='center'
			mb={3}
			sx={{
				fontSize: {
					xs: '1.5rem',
					sm: '2rem',
					md: '2.25rem',
				},
			}}
		>
			{children}
		</Typography>
	);
};

export default PageTitle;
