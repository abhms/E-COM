import { createSlice } from '@reduxjs/toolkit';

export const order = createSlice({
  name: 'order', // Change the name to 'order'
  initialState: {
    allData: [],
    address:[],
  },
  reducers: {
    setMatchedTenants: (state, action) => {
      state.allData = action.payload.products; // Update the property name and payload
    },
    setAddress: (state, action) => {
      state.address = action.payload.formData; // Update the property name and payload
    },
  },
});

export const { setMatchedTenants ,setAddress} = order.actions;

export default order.reducer;