import type { FC } from 'react';

import { Box } from '@mui/material';

/**
 * Avoid using plain <div> around MUI components — it may break layout or styling. Use <Box height='100%'> or <> instead
 */
const HomePage: FC = () => {
	return (
		<Box height='100%'>
			{/* <HierarchyView /> */}
			// Fix pull request
		</Box>
	);
};
export default HomePage;
