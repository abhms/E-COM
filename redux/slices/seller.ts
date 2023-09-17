import { createSlice } from '@reduxjs/toolkit';

export const seller = createSlice({
  name: 'seller',
  initialState: {
    allSellerProduct: [],
    allSellerOrder:[]
  },
  reducers: {
    setAllSellerProduct: (state, action) => {
      state.allSellerProduct = action.payload; 
    },
    setAllSellerOrder: (state, action) => {
      state.allSellerOrder = action.payload.orders;
    },
  },
});

export const { setAllSellerProduct ,setAllSellerOrder} = seller.actions;

export default seller.reducer;
