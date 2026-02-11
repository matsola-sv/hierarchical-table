import type { User } from '@/models/identity';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import type { RootState } from '@/store';
import type { IdentityState } from '@/store/auth/authSlice';

export interface AuthResult {
	isAuthenticated: boolean;
	isLoadingProfile: boolean;
	isAuthReady: boolean; // Auth state resolved — user is known or confirmed unauthenticated
	identity: IdentityState;
	profile: User | null;
}

export const useAuth = (): AuthResult => {
	const { uid, provider, authChecked } = useTypedSelector((state: RootState) => state.auth);
	const profile = useTypedSelector((state: RootState) => state.profile);

	const isAuthenticated = Boolean(uid);
	const isLoadingProfile = profile.loading;
	const isAuthReady = authChecked && !profile.loading;

	return {
		isAuthenticated,
		isLoadingProfile,
		isAuthReady,
		identity: { uid, provider },
		profile: profile.user,
	};
};
