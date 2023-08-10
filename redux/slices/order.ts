import { createSlice } from '@reduxjs/toolkit';

export const order = createSlice({
  name: 'order', // Change the name to 'order'
  initialState: {
    allData: [],
  },
  reducers: {
    setMatchedTenants: (state, action) => {
      state.allData = action.payload.products; // Update the property name and payload
    },
  },
});

export const { setMatchedTenants } = order.actions;

export default order.reducer;