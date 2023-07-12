import { configureStore } from '@reduxjs/toolkit';
import authnReducer from './authnReducer';

import toastReducer from './toast';

export const store = configureStore({
  reducer: {
    authnReducer,
    toastReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
