import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AuthUIState {
	forms: {
		signIn: { submitting: boolean };
		signUp: { submitting: boolean };
	};
}

const initialState: AuthUIState = {
	forms: {
		signIn: { submitting: false },
		signUp: { submitting: false },
	},
};

const authUISlice = createSlice({
	name: 'authUI',
	initialState,
	reducers: {
		setSignInSubmitting(state, action: PayloadAction<boolean>) {
			state.forms.signIn.submitting = action.payload;
		},
		setSignUpSubmitting(state, action: PayloadAction<boolean>) {
			state.forms.signUp.submitting = action.payload;
		},
	},
});

export const { setSignInSubmitting, setSignUpSubmitting } = authUISlice.actions;
export default authUISlice.reducer;
