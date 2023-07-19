import { configureStore } from '@reduxjs/toolkit';
import authnReducer from './authnReducer';
import currentImgReducer from './currentImgReducer';

export const store = configureStore({
  reducer: {
    authnReducer,
    currentImgReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
