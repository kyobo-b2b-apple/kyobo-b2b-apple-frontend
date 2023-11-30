// cartSlice.js

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, DataRow } from '../interface/product';

const initialState: DataRow[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<DataRow[]>) {
      return action.payload;
    },
    clearCartItems() {
      return [];
    },
  },
});

export const { setCartItems, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;
