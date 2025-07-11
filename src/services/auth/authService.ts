import {
	AuthErrorFields,
	type IAuthOptions,
	type IAuthService,
	OAuthProviders,
} from '@/models/auth';
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

	/**
	 * Indicates whether the current user's profile update is pending.
	 *
	 * Used to track asynchronous profile updates after authentication
	 * so components and observers can react accordingly.
	 *
	 * This flag is reset after the profile is updated or on sign out.
	 */
	private isPendingProfile: boolean = false;

	constructor(provider: IAuthService) {
		this.provider = provider;
	}

	createAccount(email: string, password: string, options?: IAuthOptions): Promise<User> {
		// Options must be applied before account creation,
		// otherwise the auth listener may trigger before they take effect.
		this.applyAuthOptions(options);

		return this.provider.createAccount(email, password, options);
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
		this.clearPendingProfile();
		return this.provider.signOut();
	}

	async updateProfile(userId: string, profile: UserProfile): Promise<User> {
		try {
			return await this.provider.updateProfile(userId, profile);
		} finally {
			// Mark profile as no longer pending, even if update fails
			this.clearPendingProfile();
		}
	}

	hasPendingProfile(): boolean {
		return this.isPendingProfile;
	}

	getCurrentUser(): User | null {
		return this.provider.getCurrentUser();
	}

	private setPendingProfile(): void {
		this.isPendingProfile = true;
	}

	/**
	 * Clears the flag that indicates a pending profile update.
	 * Called after the profile is updated or during sign-out.
	 */
	private clearPendingProfile(): void {
		this.isPendingProfile = false;
	}

	private applyAuthOptions(options?: IAuthOptions): void {
		if (options?.isProfilePending) {
			this.setPendingProfile();
		}
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
