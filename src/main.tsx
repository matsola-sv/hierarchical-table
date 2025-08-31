import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@/store';

import App from '@/components/Core/App/App';
import IdentityProvider from '@/components/Core/Providers/IdentityProvider';
import LangProvider from '@/components/Core/Providers/LangProvider';

import '@/assets/styles/index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<StrictMode>
		<Provider store={store}>
			<LangProvider>
				<IdentityProvider>
					<App />
				</IdentityProvider>
			</LangProvider>
		</Provider>
	</StrictMode>,
);
