import type { User } from '@/models/identity';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import type { RootState } from '@/store';
import type { AuthState } from '@/store/auth/authSlice';

export interface AuthResult {
	isAuthenticated: boolean;
	identity: AuthState;
	profile: User | null;
}

export const useAuth = (): AuthResult => {
	const { uid, provider } = useTypedSelector((state: RootState) => state.auth);
	const profile = useTypedSelector((state: RootState) => state.profile.user);
	const isAuthenticated = Boolean(uid);

	return {
		isAuthenticated,
		identity: { uid, provider },
		profile,
	};
};
