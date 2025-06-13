import type { User, UserProfile } from '@/models/identity';

/**
 *  Public methods exposed by the authentication service
 */
export interface IAuthService {
	createAccount(email: string, password: string): Promise<User>;
	signIn(email: string, password: string): Promise<User>;
	signInWithGoogle(): Promise<User>;
	signInWithGithub(): Promise<User>;
	signOut(): Promise<void>;
	updateProfile(userId: string, profile: UserProfile): Promise<User>;
	getCurrentUser(): User | null;
}

/**
 * OAuth-based third-party authorization providers
 */
export enum OAuthProviders {
	Google = 'Google',
	GitHub = 'GitHub',
}

export enum AuthErrorFields {
	Generic = 'generic',
}
