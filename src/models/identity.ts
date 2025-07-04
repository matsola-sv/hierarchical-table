export interface UserProfile {
	displayName: string | null;
	avatar?: string | null;
}

export interface User extends UserProfile {
	id: string;
	email: string | null;
}

export interface AvatarOptions {
	background?: string;
	color?: string;
}
