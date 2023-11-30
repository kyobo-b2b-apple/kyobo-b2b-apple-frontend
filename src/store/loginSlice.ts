import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' ? true : false,
  user: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
    },
  },
});

export const { loginSuccess, logout } = loginSlice.actions;

export default loginSlice.reducer;
