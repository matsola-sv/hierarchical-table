import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import '@/core/i18n';

import { store } from '@/store';

import App from '@/components/Core/App/App';
import AuthProvider from '@/components/Core/Providers/AuthProvider';

import '@/assets/styles/index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<StrictMode>
		<Provider store={store}>
			<AuthProvider>
				<App />
			</AuthProvider>
		</Provider>
	</StrictMode>,
);
