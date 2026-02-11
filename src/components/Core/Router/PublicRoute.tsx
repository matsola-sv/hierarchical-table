import { type FC, type PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import * as ROUTES from '@/constants/routes';

import { useAuth } from '@/hooks/useAuth';

import { OverlaySpinner } from '@/components/Common/UI/Spinners';

const PublicRoute: FC<PropsWithChildren> = ({ children }) => {
	const { isAuthenticated, isLoadingProfile } = useAuth();

	if (isLoadingProfile) {
		return <OverlaySpinner />;
	}

	// Redirect authenticated users to HOME while profile loads
	if (isAuthenticated) {
		return (
			<Navigate
				to={ROUTES.HOME}
				replace
			/>
		);
	}
	return <>{children}</>;
};

export default PublicRoute;
