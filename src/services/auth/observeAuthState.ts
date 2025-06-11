import { onAuthStateChanged } from 'firebase/auth';

import type { User } from '@/models/identity';

import { firebaseAuth } from '@/core/firebase/auth';
import { convertToUser } from '@/core/firebase/utils';

import type { AppDispatch } from '@/store';
import { type AuthState, clearIdentity, setIdentity } from '@/store/auth/authSlice';
import { clearProfile, setProfile } from '@/store/profile/profileSlice';

export const observeAuthState = (dispatch: AppDispatch) => {
	const unsubscribe = onAuthStateChanged(firebaseAuth, async fbUser => {
		if (fbUser) {
			const identityState: AuthState = {
				uid: fbUser.uid,
				provider: fbUser.providerData[0].providerId,
			};
			const userProfile: User = convertToUser(fbUser);

			dispatch(setIdentity(identityState));
			dispatch(setProfile(userProfile));
		} else {
			dispatch(clearIdentity());
			dispatch(clearProfile());
		}
	});

	return unsubscribe;
};
