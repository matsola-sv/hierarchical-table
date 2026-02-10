import type { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import * as ROUTES from '@/constants/routes';

import { getPublicUrl } from '@/utils/url';

import SignInPage from '@/pages/Auth/SignIn';
import SignUpPage from '@/pages/Auth/SignUp';
import NotFoundPage from '@/pages/Errors/NotFound';
import HomePage from '@/pages/Home';
import PostsPage from '@/pages/Posts';

import PageLayout from '@/components/Core/Layouts/PageLayout';

import PublicRoute from './PublicRoute';

const AppRouter: FC = () => (
	<BrowserRouter basename={getPublicUrl()}>
		<Routes>
			<Route
				path={ROUTES.HOME}
				element={<PageLayout />}
			>
				<Route
					index
					element={<HomePage />}
				/>
				<Route
					path={ROUTES.SIGN_UP}
					element={
						<PublicRoute>
							<SignUpPage />
						</PublicRoute>
					}
				/>
				<Route
					path={ROUTES.SIGN_IN}
					element={
						<PublicRoute>
							<SignInPage />
						</PublicRoute>
					}
				/>
				<Route
					path={ROUTES.POSTS}
					element={
						<PublicRoute>
							<PostsPage />
						</PublicRoute>
					}
				/>
				<Route
					path='*'
					element={<NotFoundPage />}
				/>
			</Route>
		</Routes>
	</BrowserRouter>
);

export default AppRouter;
