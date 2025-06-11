import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from '@/store/auth/authSlice';
import hierarchyReducer from '@/store/hierarchy/hierarchySlice';
import profileReducer from '@/store/profile/profileSlice';

export const rootReducer = combineReducers({
	auth: authReducer,
	profile: profileReducer,
	hierarchy: hierarchyReducer,
});

export const store = configureStore({
	devTools: import.meta.env.MODE !== 'production',
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
