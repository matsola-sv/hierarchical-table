import type { User as FirebaseUser } from 'firebase/auth';

import type { User } from '@/models/identity';

export const convertToUser = (fbUser: FirebaseUser): User => {
	return {
		id: fbUser.uid,
		email: fbUser.email,
		displayName: fbUser.displayName,
		avatar: fbUser.photoURL,
	};
};
