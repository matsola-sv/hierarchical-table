import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { observeAuthState } from '@/services/auth/observeAuthState';

import { type AppDispatch } from '@/store';

/**
 * User authentication (identity verification).
 * Subscribes to identity state changes and updates the Redux store
 */
const IdentityProvider = ({ children }: PropsWithChildren) => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const unsubscribe = observeAuthState(dispatch);

		return () => {
			unsubscribe();
		};
	}, [dispatch]);

	return <>{children}</>;
};

export default IdentityProvider;
