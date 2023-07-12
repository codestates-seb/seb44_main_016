import { configureStore } from '@reduxjs/toolkit';
import authnReducer from './authnReducer';

export const store = configureStore({
  reducer: {
    authnReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
