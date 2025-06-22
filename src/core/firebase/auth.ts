import { FirebaseError } from 'firebase/app';
import {
	type Auth,
	GithubAuthProvider,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	updateProfile as fbUpdateProfile,
	getAuth,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth';

import { AuthErrorFields } from '@/models/auth';
import type { User, UserProfile } from '@/models/identity';

import firebaseApp from '@/core/firebase/config';
import { convertToUser } from '@/core/firebase/utils';
import i18n from '@/core/i18n';

import type { IAuthError } from '@/services/auth/authService';

export enum AuthErrorCode {
	EmailInUse = 'email-already-in-use',
	InvalidEmail = 'invalid-email',
	UserNotFound = 'user-not-found',
	AccountExistsDiffCred = 'account-exists-with-different-credential',
	InvalidCredential = 'invalid-credential',
	NetworkFailed = 'network-request-failed',
}

type ErrorInfo = {
	field: IAuthError['field'];
	getMessage: (email?: string) => string;
};

export const errorMap: Record<AuthErrorCode, ErrorInfo> = {
	[AuthErrorCode.UserNotFound]: {
		field: 'email',
		getMessage: () => i18n.t('components.auth.signInForm.errors.email.notFound'),
	},
	[AuthErrorCode.EmailInUse]: {
		field: AuthErrorFields.Generic,
		getMessage: () => i18n.t('components.auth.signUpForm.errors.email.alreadyUse'),
	},
	[AuthErrorCode.InvalidEmail]: {
		field: 'email',
		getMessage: () => i18n.t('components.auth.signInForm.errors.email.invalid'),
	},
	[AuthErrorCode.InvalidCredential]: {
		field: 'password',
		getMessage: () => i18n.t('components.auth.signInForm.errors.invalidCredential'),
	},
	[AuthErrorCode.AccountExistsDiffCred]: {
		field: AuthErrorFields.Generic,
		getMessage: email =>
			i18n.t('components.auth.signInForm.errors.email.accountExists', { email }),
	},
	[AuthErrorCode.NetworkFailed]: {
		field: AuthErrorFields.Generic,
		getMessage: () => i18n.t('errors.network.requestFailed'),
	},
};

export class FirebaseAuthService {
	private auth: Auth;

	constructor(auth: Auth) {
		this.auth = auth;
	}

	async createAccount(email: string, password: string): Promise<User> {
		const credential = await createUserWithEmailAndPassword(this.auth, email, password);
		return convertToUser(credential.user);
	}

	async signIn(email: string, password: string): Promise<User> {
		const credential = await signInWithEmailAndPassword(this.auth, email, password);
		return convertToUser(credential.user);
	}

	async signInWithGoogle(): Promise<User> {
		const credential = await signInWithPopup(this.auth, new GoogleAuthProvider());
		return convertToUser(credential.user);
	}

	async signInWithGithub(): Promise<User> {
		const credential = await signInWithPopup(this.auth, new GithubAuthProvider());
		return convertToUser(credential.user);
	}

	async signOut(): Promise<void> {
		return signOut(this.auth);
	}

	async updateProfile(userId: string, profile: UserProfile): Promise<User> {
		const fbUser = this.auth.currentUser;

		if (!fbUser || fbUser.uid !== userId) {
			throw new Error('User not found or mismatched');
		}

		await fbUpdateProfile(fbUser, {
			displayName: profile.displayName,
			photoURL: profile.avatar,
		});
		// Reloads the user from Firebase to get the latest profile data.
		// Necessary because updateProfile doesn't update the local user object.
		await fbUser.reload();

		return convertToUser(this.auth.currentUser!);
	}

	getCurrentUser(): User | null {
		const fbUser = this.auth.currentUser;

		if (!fbUser) {
			return null;
		}
		return convertToUser(fbUser);
	}
}

export function mapFirebaseError(error: unknown): FirebaseError | null {
	if (error instanceof FirebaseError) {
		const code = error.code.replace('auth/', '') as AuthErrorCode;

		return { ...error, code };
	}
	return null;
}

/**
 * @param logUnmapped - If true, logs errors without translations that aren’t shown to the user.
 */
export function parseFirebaseAuthError(error: FirebaseError, logUnmapped = true): IAuthError {
	const code = error.code.replace('auth/', '') as AuthErrorCode;
	const errorInfo = errorMap[code];

	if (logUnmapped && !errorInfo) {
		console.error('[Unmapped Auth Error]', error);
	}

	if (errorInfo) {
		const email = (error as FirebaseError)?.customData?.email ?? '';

		return {
			field: errorInfo.field,
			message: errorInfo.getMessage(email as string),
		};
	}

	return {
		field: AuthErrorFields.Generic,
		message: i18n.t('errors.network.generic'),
	};
}

export const firebaseAuth = getAuth(firebaseApp);
