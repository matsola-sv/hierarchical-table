import type { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import * as ROUTES from '@/constants/routes';

import { useAuth } from '@/hooks/useAuth';

import OverlaySpinner from '@/components/Common/UI/Spinners/OverlaySpinner';

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
	const { isAuthenticated, isLoadingProfile } = useAuth();

	if (isLoadingProfile) {
		return <OverlaySpinner />;
	}

	if (!isAuthenticated) {
		return (
			<Navigate
				to={ROUTES.SIGN_IN}
				replace
			/>
		);
	}
	return <>{children}</>;
};

export default ProtectedRoute;
