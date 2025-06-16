import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

/**
 * NOTE: If new fields are added to IdentityState — remember to update compareIdentities accordingly!
 */
export interface IdentityState {
	uid: string;
	provider: string;
}

export interface AuthState extends IdentityState {
	authChecked: boolean; // Authentication check completed — result is known even if user isn't authenticated
}

// Only the fields that define user identity are compared.
// TODO Use lodash's isEqual() if more fields are added or deep state comparison is needed.
function compareIdentities(state: AuthState, state2: AuthState): boolean {
	return state.uid === state2.uid && state.provider === state2.provider;
}

const initialState: AuthState = {
	uid: '',
	provider: '',
	authChecked: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIdentity(state, action: PayloadAction<IdentityState>): void {
			state.uid = action.payload.uid;
			state.provider = action.payload.provider;
			state.authChecked = true;
		},

		// Clears user identity while marking that authentication check has been completed.
		clearIdentityAfterAuth(state) {
			if (compareIdentities(state, initialState)) {
				state.authChecked = true;
			} else {
				return {
					...initialState,
					authChecked: true,
				};
			}
		},
	},
});

export const { setIdentity, clearIdentityAfterAuth } = authSlice.actions;
export default authSlice.reducer;
