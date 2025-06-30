import { Link } from 'react-router-dom';

import { AccountTree } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

import * as ROUTES from '@/constants/routes';

const Logo = () => (
	<Box
		component={Link}
		to={ROUTES.HOME}
		sx={{
			display: 'flex',
			alignItems: 'center',
			textDecoration: 'none',
			color: 'inherit',
		}}
	>
		<AccountTree sx={{ mr: 1 }} />
		<Typography
			variant='h6'
			noWrap
		>
			Hierarchy
		</Typography>
	</Box>
);

export default Logo;
