import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResData } from '../../types/user';

interface AuthnState {
  login: LoginResData;
}

const initialState: AuthnState = {
  login: {
    userId: null,
    accessToken: null,
    loginId: null,
    nickname: null,
    isLoggedIn: false,
    profileImgPath: null,
  },
};

const authnReducer = createSlice({
  name: 'authnReducer',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginResData>) => {
      state.login.userId = action.payload.userId;
      state.login.accessToken = action.payload.accessToken;
      state.login.loginId = action.payload.loginId;
      state.login.nickname = action.payload.nickname;
      state.login.isLoggedIn = action.payload.isLoggedIn;
      state.login.profileImgPath = action.payload.profileImgPath;
    },
    logout: (state) => {
      state.login = initialState.login;
    },
  },
});

export const { login, logout } = authnReducer.actions;

export default authnReducer.reducer;
