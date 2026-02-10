import type { FC } from 'react';
import { Link } from 'react-router-dom';

import ApiIcon from '@mui/icons-material/Cloud';
import { IconButton, Tooltip } from '@mui/material';

import * as ROUTES from '@/constants/routes';

export const ApiDemo: FC = () => {
	return (
		<Tooltip title='Demo API'>
			<IconButton
				component={Link}
				to={ROUTES.POSTS}
				sx={{
					display: 'inline-flex',
					alignItems: 'center',
					gap: 1,
					fontSize: {
						xs: 12,
						sm: 14,
						md: 16,
					},
				}}
			>
				<ApiIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} />
				Demo Api
			</IconButton>
		</Tooltip>
	);
};

export default ApiDemo;
