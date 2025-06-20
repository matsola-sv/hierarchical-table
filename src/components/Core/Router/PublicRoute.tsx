import { type FC, type ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as ROUTES from '@/constants/routes';

import { useAuth } from '@/hooks/useAuth';

import OverlaySpinner from '@/components/Common/UI/Spinners/OverlaySpinner/OverlaySpinner';

const PublicRoute: FC<{ children: ReactNode }> = ({ children }) => {
	const { isAuthenticated, isLoadingProfile } = useAuth();
	const navigate = useNavigate();

	// Redirect happens immediately after authentication,
	// profile loads asynchronously.
	// This prevents blocking the user and improves UX.
	useEffect(() => {
		if (isAuthenticated) {
			navigate(ROUTES.HOME);
		}
	}, [isAuthenticated, navigate]);

	if (isLoadingProfile) {
		return <OverlaySpinner />;
	}

	return <>{children}</>;
};

export default PublicRoute;
