import type { FC } from 'react';

import { SnackbarProvider } from 'notistack';

import AppRouter from '@/components/Core/Router/AppRouter';

import './App.css';

const App: FC = () => {
	return (
		<SnackbarProvider autoHideDuration={2000}>
			<div className='App'>
				<AppRouter />
			</div>
		</SnackbarProvider>
	);
};
export default App;
