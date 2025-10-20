import type { FC } from 'react';

import { Box } from '@mui/material';

import HierarchyView from '@/components/Hierarchy/HierarchyView/HierarchyView';

/**
 * Avoid using plain <div> around MUI components — it may break layout or styling. Use <Box height='100%'> or <> instead
 */
const HomePage: FC = () => {
	return <Box height='100%'>{/* <HierarchyView /> */}</Box>;
};
export default HomePage;
