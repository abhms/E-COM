import { createSlice } from '@reduxjs/toolkit';

export const seller = createSlice({
  name: 'seller',
  initialState: {
    allSellerProduct: [],
  },
  reducers: {
    setAllSellerProduct: (state, action) => {
      state.allSellerProduct = action.payload; 
    },
  },
});

export const { setAllSellerProduct } = seller.actions;

export default seller.reducer;
