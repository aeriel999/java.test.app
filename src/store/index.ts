import { configureStore } from '@reduxjs/toolkit';
import accountReducer from "./accounts/account.slice.ts";
import bloReducer from "./blog/blog.slice.ts";

export const store = configureStore({
    reducer: {
        //category: categoryReducer,
        account: accountReducer,
        blog: bloReducer
    },
});

// Типізація Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;