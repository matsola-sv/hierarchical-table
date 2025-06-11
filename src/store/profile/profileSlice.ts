import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { User } from '@/models/identity';

interface ProfileState {
	user: User | null;
	isLoading: boolean;
	error: string | null;
}

const initialState: ProfileState = {
	user: null,
	isLoading: false,
	error: null,
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setProfile(state, action: PayloadAction<User>) {
			state.user = action.payload;
			state.error = null;
			state.isLoading = false;
		},
		clearProfile() {
			return initialState;
		},
	},
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
