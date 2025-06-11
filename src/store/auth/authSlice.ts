import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AuthState {
	uid: string;
	provider: string;
}

const initialState: AuthState = {
	uid: '',
	provider: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIdentity(state, action: PayloadAction<AuthState>) {
			state.uid = action.payload.uid;
			state.provider = action.payload.provider;
		},
		clearIdentity() {
			return initialState;
		},
	},
});

export const { setIdentity, clearIdentity } = authSlice.actions;
export default authSlice.reducer;
