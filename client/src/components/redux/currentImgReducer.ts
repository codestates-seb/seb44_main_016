import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChangeUserImg {
  currentImgSrc: string | null;
  isAvatar: boolean;
}

const initialState: ChangeUserImg = {
  currentImgSrc: '',
  isAvatar: false,
};

const currentImgReducer = createSlice({
  name: 'currentImgReducer',
  initialState,
  reducers: {
    changeImgSrc: (state, action: PayloadAction<ChangeUserImg>) => {
      const { currentImgSrc, isAvatar } = action.payload;
      state.currentImgSrc = currentImgSrc;
      state.isAvatar = isAvatar;
    },
  },
});

export const { changeImgSrc } = currentImgReducer.actions;

export default currentImgReducer.reducer;
