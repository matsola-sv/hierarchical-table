import { type FC, type ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as ROUTES from '@/constants/routes';

import { useAuth } from '@/hooks/useAuth';

const PublicRoute: FC<{ children: ReactNode }> = ({ children }) => {
	const { isAuthenticated, isLoadingProfile } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated && !isLoadingProfile) {
			navigate(ROUTES.HOME);
		}
	}, [isAuthenticated, isLoadingProfile, navigate]);

	return !isAuthenticated ? <>{children}</> : null;
};

export default PublicRoute;
