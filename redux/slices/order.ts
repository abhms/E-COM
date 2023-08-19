import { createSlice } from '@reduxjs/toolkit';

export const order = createSlice({
  name: 'order', 
  initialState: {
    users:[],
    allData: [],
    address:[],
  },
  reducers: {
    setUsers:(state,action)=>{
      state.users = action.payload.users;
    },
    setMatchedTenants: (state, action) => {
      state.allData = action.payload.products;
    },
    setAddress: (state, action) => {
      state.address = action.payload.formData;
    },
  },
});

export const {setUsers, setMatchedTenants ,setAddress} = order.actions;

export default order.reducer;
