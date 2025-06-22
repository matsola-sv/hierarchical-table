import type { FC } from 'react';

import { Box } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import AppRouter from '@/components/Core/Router/AppRouter';

const App: FC = () => {
	return (
		<SnackbarProvider autoHideDuration={5000}>
			<Box
				className='App'
				sx={{ textAlign: 'center' }}
			>
				<AppRouter />
			</Box>
		</SnackbarProvider>
	);
};
export default App;
