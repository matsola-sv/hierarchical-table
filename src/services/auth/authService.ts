import { AuthErrorFields, type IAuthService, OAuthProviders } from '@/models/auth';
import type { User, UserProfile } from '@/models/identity';

import type { SignInFormFields } from '@/components/Auth/SignInForm/SignInForm.schema';

import {
	FirebaseAuthService,
	firebaseAuth,
	mapFirebaseError,
	parseFirebaseAuthError,
} from '@/core/firebase/auth';
import i18n from '@/core/i18n';

export interface IAuthError {
	field: keyof SignInFormFields | AuthErrorFields.Generic;
	message: string;
}

export class AuthService implements IAuthService {
	private provider: IAuthService;

	constructor(provider: IAuthService) {
		this.provider = provider;
	}

	createAccount(email: string, password: string): Promise<User> {
		return this.provider.createAccount(email, password);
	}

	signIn(email: string, password: string): Promise<User> {
		return this.provider.signIn(email, password);
	}

	signInWithGoogle(): Promise<User> {
		return this.provider.signInWithGoogle();
	}

	signInWithGithub(): Promise<User> {
		return this.provider.signInWithGithub();
	}

	signInWithProvider(provider: OAuthProviders): Promise<User> {
		switch (provider) {
			case OAuthProviders.Google:
				return this.signInWithGoogle();
			case OAuthProviders.GitHub:
				return this.signInWithGithub();
			default:
				throw new Error(`Unsupported auth provider: ${provider}`);
		}
	}

	signOut(): Promise<void> {
		return this.provider.signOut();
	}

	updateProfile(userId: string, profile: UserProfile): Promise<User> {
		return this.provider.updateProfile(userId, profile);
	}

	getCurrentUser(): User | null {
		return this.provider.getCurrentUser();
	}
}

/**
 * Parsing errors for UI
 * @param logUnmapped - If true, logs errors without translations that aren’t shown to the user.
 */
export function parseAuthError(error: unknown, logUnmapped = true): IAuthError {
	const fbError = mapFirebaseError(error);

	if (fbError) {
		return parseFirebaseAuthError(fbError, logUnmapped);
	}
	return {
		field: AuthErrorFields.Generic,
		message: i18n.t('errors.unknown'),
	};
}

// Init a service with a Firebase implementation
export const authService = new AuthService(new FirebaseAuthService(firebaseAuth));
