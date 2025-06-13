import { BrowserRouter, Route, Routes } from 'react-router-dom';

import * as ROUTES from '@/constants/routes';

import { getPublicUrl } from '@/utils/url';

import SignInPage from '@/pages/Auth/SignIn';
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
				<Route
					path={ROUTES.SIGN_IN}
					element={<SignInPage />}
				/>
			</Routes>
		</BrowserRouter>
	);
}
export default AppRouter;
