// sidebarSlice.js

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isMobileSideBarOpen: true,
};

const mobileSidebarSlice = createSlice({
  name: 'mobilesidebar',
  initialState,
  reducers: {
    setMobileSideState: (state, action: PayloadAction<boolean>) => {
      state.isMobileSideBarOpen = action.payload;
    },
  },
});

export const { setMobileSideState } = mobileSidebarSlice.actions;

export default mobileSidebarSlice.reducer;
