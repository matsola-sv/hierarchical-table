import type { User } from '@/models/identity';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import type { RootState } from '@/store';
import type { IdentityState } from '@/store/auth/authSlice';

export interface AuthResult {
	isAuthenticated: boolean;
	isLoadingProfile: boolean;
	authChecked: boolean; // Auth check completed — result is known even if user isn't authenticated
	identity: IdentityState;
	profile: User | null;
}

export const useAuth = (): AuthResult => {
	const { uid, provider, authChecked } = useTypedSelector(
		(state: RootState) => state.auth,
	);
	const profile = useTypedSelector((state: RootState) => state.profile);
	const isAuthenticated = Boolean(uid);
	const isLoadingProfile = profile.isLoading;

	return {
		isAuthenticated,
		isLoadingProfile,
		authChecked,
		identity: { uid, provider },
		profile: profile.user,
	};
};
