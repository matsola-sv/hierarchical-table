import { combineReducers, configureStore } from "@reduxjs/toolkit";
import hierarchyReducer  from "store/hierarchy/hierarchySlice";

export const rootReducer = combineReducers({
    hierarchy: hierarchyReducer,
});

export const store = configureStore({
    devTools: process.env.NODE_ENV !== "production",
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;