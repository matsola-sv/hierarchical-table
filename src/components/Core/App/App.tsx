import type { FC } from 'react';

import AppRouter from '@/components/Core/Router/AppRouter';

import './App.css';

const App: FC = () => {
	return (
		<div className='App'>
			<AppRouter />
		</div>
	);
};
export default App;
