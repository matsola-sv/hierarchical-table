import { BrowserRouter, Route, Routes } from 'react-router-dom';

import * as ROUTES from '@/constants/routes';

import { getPublicUrl } from '@/utils/url';

import SignUpPage from '@/pages/Auth/SignUp';
import NotFoundPage from '@/pages/Errors/NotFound';
import HomePage from '@/pages/Home';

function AppRouter() {
	return (
		<BrowserRouter basename={getPublicUrl()}>
			<Routes>
				<Route
					path='*'
					element={<NotFoundPage />}
				/>
				<Route
					path={ROUTES.HOME}
					element={<HomePage />}
				/>
				<Route
					path={ROUTES.SIGN_UP}
					element={<SignUpPage />}
				/>
			</Routes>
		</BrowserRouter>
	);
}
export default AppRouter;
