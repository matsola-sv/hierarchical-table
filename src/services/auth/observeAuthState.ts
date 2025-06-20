import { onAuthStateChanged } from 'firebase/auth';

import type { User } from '@/models/identity';

import { firebaseAuth } from '@/core/firebase/auth';
import { convertToUser } from '@/core/firebase/utils';

import { authService } from '@/services/auth/authService';

import type { AppDispatch } from '@/store';
import {
	type IdentityState,
	clearIdentityAfterAuth,
	setIdentity,
} from '@/store/auth/authSlice';
import { clearProfile, setProfile } from '@/store/profile/profileSlice';

export const observeAuthState = (dispatch: AppDispatch) => {
	const unsubscribe = onAuthStateChanged(firebaseAuth, async fbUser => {
		if (fbUser) {
			const identityState: IdentityState = {
				uid: fbUser.uid,
				provider: fbUser.providerData[0].providerId,
			};
			const user: User = convertToUser(fbUser);
			const isProfileLoading = authService.hasPendingProfile();

			dispatch(setIdentity(identityState));
			dispatch(setProfile({ user, loading: isProfileLoading }));
		} else {
			dispatch(clearIdentityAfterAuth());
			dispatch(clearProfile());
		}
	});

	return unsubscribe;
};
