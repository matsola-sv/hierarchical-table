import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { User } from '@/models/identity';

interface ProfileState {
	user: User | null;
	isLoading: boolean;
}

const initialState: ProfileState = {
	user: null,
	isLoading: false,
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		// Sets the initial profile state when authentication changes.
		// The loading flag reflects whether further profile updates are still in progress.
		setProfile: (state, action: PayloadAction<ProfileState>) => {
			state.user = action.payload.user;
			state.isLoading = action.payload.isLoading;
		},

		// Applies the updated user profile and marks loading as complete.
		updateUserProfile: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
			state.isLoading = false;
		},

		clearProfile() {
			return initialState;
		},
	},
});

export const { setProfile, updateUserProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
