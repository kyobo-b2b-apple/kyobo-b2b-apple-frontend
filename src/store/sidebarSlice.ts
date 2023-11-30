import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSideBarOpen: true,
};

const sideBarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSideBarOpen: (state, action) => {
      state.isSideBarOpen = action.payload;
    },
  },
});

export const { setSideBarOpen } = sideBarSlice.actions;
export default sideBarSlice.reducer;
