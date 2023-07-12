import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  notifications: string[];
}

const initialState: ToastState = { notifications: [] };

export const toastReducer = createSlice({
  name: 'toastReducer',
  initialState,
  reducers: {
    enqueue: (state, action: PayloadAction<string>) => {
      return {
        notifications: [...state.notifications, action.payload],
      };
    },
    dequeue: (state) => {
      return { notifications: state.notifications.slice(1) };
    },
  },
});

export const { enqueue, dequeue } = toastReducer.actions;
export default toastReducer.reducer;
