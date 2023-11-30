import { configureStore } from '@reduxjs/toolkit';
import sideBarReducer from './sidebarSlice';
import loginReducer from './loginSlice';
import mobileSidebarReducer from './mobileSidebarSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    sidebar: sideBarReducer,
    login: loginReducer,
    mobileSidebar: mobileSidebarReducer,
    cart: cartReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
