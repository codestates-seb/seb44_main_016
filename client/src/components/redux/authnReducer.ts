import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginData {
  accessToken: string | null;
  refreshToken: string | null;
  userId: number | null;
  userName: string | null;
  userEmail: string | null;
  isLogin: boolean;
}

interface AuthnState {
  login: LoginData;
}

const initialState: AuthnState = {
  login: {
    accessToken: null,
    refreshToken: null,
    userId: null,
    userName: null,
    userEmail: null,
    isLogin: false,
  },
};

const authnReducer = createSlice({
  name: 'authnReducer',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginData>) => {
      state.login = action.payload;
    },
    logout: (state) => {
      state.login = initialState.login;
    },
  },
});

export const { login, logout } = authnReducer.actions;

export default authnReducer.reducer;
