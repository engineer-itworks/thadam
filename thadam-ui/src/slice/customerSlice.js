import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCustomer: {},
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    selectCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
  },
});

export const { selectCustomer } = customerSlice.actions;
export default customerSlice.reducer;